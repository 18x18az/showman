'use client'

import { EmptyPost, JsonTopic, Post } from '@/utils/maestro'
import { Alliance, FieldState, FieldStatus, Match, Round } from './interfaces'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import RestButton from '@/components/ui/rest-button'

export enum StreamDisplayStage {
  UNKNOWN = 'UNKNOWN',
  MATCH  = 'MATCH',
  RESULTS = 'RESULTS',
  TRANSITIONING = 'TRANSITIONING',
}

interface FieldControlProps {
  readonly status: FieldStatus
  readonly isCurrent: boolean
  readonly display: StreamDisplayStage
}

function makeTime(offset: number, truncate=false): string {
  if(truncate && offset < 0) {
    return '0:00'
  }

  const time = Math.floor(offset / 1000)
  const minutes = Math.floor(time / 60).toString()
  const seconds = (time % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

function makeMatchString (match: Match | undefined): string {
    if (match === undefined) {
        return ''
    }
    let pre = 'Q'
    if(match.round === Round.Ro16) {
      pre = 'R16'
    } else if(match.round === Round.QF) {
      pre = 'QF'
    } else if(match.round === Round.SF) {
      pre = 'SF'
    } else if(match.round === Round.F) {
      return "Finals"
    }
    const num = match.matchNum.toString()

    return pre + num
}

interface AlliancesProps {
    red?: Alliance
    blue?: Alliance
}

interface TimerBodyProps {
    state: FieldState
    time?: string
}

function offsetTimer(time: Date): number {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = time.getTime() - Date.now()
            setOffset(diff)
        }, 20);
    
        return () => clearInterval(interval);
      }, [time]);

      return offset
}

function TimerBody(props: TimerBodyProps): JSX.Element {
    const {state, time} = props
    if(state === FieldState.IDLE) {
        return <></>
    }

    if(state === FieldState.ON_DECK) {
        if(time === undefined) {
            return <></>
        }

        const properDate = new Date(time)

        const offset = offsetTimer(properDate)

        const sign = offset < 0 ? '+' : '-'
        const timeString = `${sign}${makeTime(Math.abs(offset), true)}`

        return <div className='text-4xl mt-8 text-zinc-700 font-mono'>{timeString}</div>
    } else if (state === FieldState.AUTO || state === FieldState.DRIVER) {
      if(time === undefined) {
        return <></>
      }

      const properDate = new Date(time)

      let offset = offsetTimer(properDate)
      const timeString = makeTime(offset, true)

      return <div className='text-4xl mt-8 text-zinc-700 font-mono'>{timeString}</div>
    } else if (state === FieldState.PAUSED) {
      return <div className='mt-6'></div>
    } else if (state === FieldState.SCORING) {
      return <div className='mt-6'></div>
    }

    return <div className='flex flex-col mt-6'>Hi</div>
}

function SingleAlliance(props: {alliance: Alliance, color: 'red' | 'blue'}): JSX.Element {
    const teams = [props.alliance.team1]
    if(props.alliance.team2 !== undefined) {
        teams.push(props.alliance.team2)
    }

    const teamElements = teams.map((team) => {
        const color = props.color === 'red' ? 'text-red-700 text-left' : 'text-blue-700 text-right'

        return <div key={team} className={`flex flex-col text-lg ${color}`}>{team}</div>
    })
    return <div>
        {teamElements}
    </div>
}

function Alliances(props: AlliancesProps): JSX.Element {
    if(props.red === undefined || props.blue === undefined) {
        return <></>
    }
    return <div className='flex justify-between'>
        <SingleAlliance color='red' alliance={props.red} />
        <SingleAlliance color='blue' alliance={props.blue} />
    </div>
}

const start = (id: number) => {
  void EmptyPost(`fieldControl/start`)
}

const resume = () => {
  void EmptyPost('fieldControl/resume')
}

const replay = (status: FieldStatus) => {
  if(status.match === null) return
  void Post('matches/replay', status.match)
}

const cut = () => {
  void EmptyPost('stream/cut')
}

const clearScore = () => {
  void EmptyPost('stream/clearScore')
}

const pushScore = () => {
  void EmptyPost('stream/pushScore')
}

const timeout = () => {
  void EmptyPost('fieldControl/timeout')
}

function FieldControl (props: FieldControlProps): JSX.Element {
  const status = props.status
  const isCurrent = props.isCurrent

  const outlineStrength = isCurrent === true ? 'border-zinc-500' : 'border-zinc-800'

  let actionButton = <></>

  if(isCurrent === true) {
    if(status.state === FieldState.ON_DECK) {
        if(props.display === StreamDisplayStage.MATCH) {
          actionButton = <Button onClick={() => {
            if(status.match === null) return
            start(status.match.replayId)
          }} className='w-24'>Start</Button>
        } else if (props.display === StreamDisplayStage.RESULTS) {
          actionButton = <Button onClick={cut} className='w-24'>Intro</Button>
        }
    } else if(status.state === FieldState.PAUSED) {
      actionButton = <><Button className='w-24' onClick={() => {
        if(status.match === null) return
        start(status.match.replayId)
      }}>Reset</Button><Button className='w-24' onClick={resume}>Resume</Button></>
    }
  }

  const endEarly = () => {
    void EmptyPost('fieldControl/endEarly')
  }

  if(status.state === FieldState.SCORING) {
    actionButton = <Button className='w-24' onClick={() => {replay(status)}}>Replay</Button>
  }

  if(status.state === FieldState.AUTO || status.state === FieldState.DRIVER) {
    actionButton = <Button className='w-24' onClick={endEarly}>End Early</Button>
  }

  //const actionButton = isCurrent === true ? <Button className='w-24'>Do Thing</Button> : <></>

  let body = <></>

  if (status.state === FieldState.IDLE) {
    body = <p className={'mt-8 text-4xl text-zinc-500'}>IDLE</p>
  } else if ([FieldState.ON_DECK, FieldState.AUTO, FieldState.PAUSED, FieldState.DRIVER, FieldState.SCORING].includes(status.state)) {

    const match = status.match

    if(match === null) {
        return <></>
    }

    const matchString = makeMatchString(match)

    body = <>
        <h2 className='text-lg text-zinc-400 font-semibold'>{matchString}</h2>
        <TimerBody state={status.state} time={match.time}/>
        <div className='flex  justify-evenly mt-2'>{actionButton}</div>
        <div className='grow'></div>
        <Alliances red={match.red} blue={match.blue} />
    </>
  }

  return (
    <div className={`flex flex-col text-center border rounded-lg ${outlineStrength} p-4 h-72 grow basis-0`}>
      <h1 className='text-xl text-zinc-300'>{status.field.name}</h1>
      {body}
    </div>
  )
}

export function QualMatchControl (): JSX.Element {
  const fields = JsonTopic<FieldStatus[]>('fieldStatuses')
  const fieldControl = JsonTopic<FieldStatus | {state: null} >('fieldControl')
  const displayControl = JsonTopic<{stage: StreamDisplayStage}>('displayStage')
  const block = JsonTopic<{block: string | null}>('block')

  let display = displayControl === undefined ? StreamDisplayStage.UNKNOWN : displayControl.stage

  if(block === undefined) {
    return <>Loading</>
  }

  if(block.block === null) {
    return <div><RestButton url='matches/proceed' text='Queue Next Block' pendingText={'Loading...'} className='w-48'/></div>
  }

  if(fields === undefined || fieldControl === undefined) {
    return <>Loading</>
  }

  // check if all fields are idle
  const allIdle = fields.every((field) => {
    return field.state === FieldState.IDLE
  })

  const handleContinue = () => {
    void EmptyPost('fieldControl/nextBlock')
  }

  const bottomButton = allIdle ? <Button onClick={handleContinue}>Continue</Button> : <></>

  const fieldControls = fields.map((status) => {
    const field = status.field
    const isCurrent = (fieldControl !== null && fieldControl.state !== null && field.id === fieldControl.field.id)
    return <FieldControl key={field.id} status={status} isCurrent={isCurrent} display={display}/>
  })
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-evenly gap-4'>
        {fieldControls}
      </div>
      <div className='flex justify-evenly'>
        {bottomButton}
        <Button onClick={pushScore}>Push Score</Button>
        <Button onClick={clearScore}>Clear Score</Button>
        <Button onClick={timeout}>Timeout</Button>
      </div>
    </div>
  )
}
