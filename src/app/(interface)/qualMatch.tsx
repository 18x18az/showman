'use client'

import { EmptyPost, JsonTopic } from '@/utils/maestro'
import { Alliance, FieldState, FieldStatus, MatchIdentifier } from './interfaces'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface FieldControlProps {
  readonly status: FieldStatus
}

function makeMatchString (match: MatchIdentifier | undefined): string {
    if (match === undefined) {
        return ''
    }
    const pre = 'Q'
    const num = match.match.toString()

    return pre + num
}

interface AlliancesProps {
    red?: Alliance
    blue?: Alliance
}

interface TimerBodyProps {
    state: FieldState
    time?: Date
}

function offsetTimer(time: Date): number {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        console.log('am here')
        const interval = setInterval(() => {
            const diff = time.getTime() - Date.now()
            setOffset(diff)
        }, 20);
    
        return () => clearInterval(interval);
      }, []);

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
        const absDiff = Math.abs(offset)
        const minutes = Math.floor(absDiff / 60000)
        const seconds = (Math.floor(absDiff / 1000) % 60).toString().padStart(2, '0')
        const timeString = `${sign}${minutes}:${seconds}`

        return <div className='text-4xl m-12 text-zinc-700 font-mono'>{timeString}</div>
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

function FieldControl (props: FieldControlProps): JSX.Element {
  const status = props.status

  let body = <></>

  if (status.state === FieldState.IDLE) {
    body = <p className='mt-8 text-4xl text-zinc-500'>IDLE</p>
  } else if ([FieldState.ON_DECK, FieldState.AUTO, FieldState.PAUSED, FieldState.DRIVER, FieldState.SCORING].includes(status.state)) {

    const matchString = makeMatchString(status.match)

    body = <>
        <h2 className='text-lg text-zinc-400 font-semibold'>{matchString}</h2>
        <TimerBody state={status.state} time={status.time}/>
        <div className='grow'></div>
        <Alliances red={status.redAlliance} blue={status.blueAlliance} />
    </>
  }

  return (
    <div className='flex flex-col text-center border rounded-lg border-zinc-800 p-4 h-72 grow'>
      <h1 className='text-xl text-zinc-300'>{status.name}</h1>
      {body}
    </div>
  )
}

export function QualMatchControl (): JSX.Element {
  const fields = JsonTopic<FieldStatus[]>('fieldStatuses', [])

  // check if all fields are idle
  const allIdle = fields.every((field) => {
    return field.state === FieldState.IDLE
  })

  const handleContinue = () => {
    void EmptyPost('continue')
  }

  const bottomButton = allIdle ? <Button onClick={handleContinue}>Continue</Button> : <></>

  const fieldControls = fields.map((field) => {
    return <FieldControl key={field.id} status={field} />
  })
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-evenly gap-4'>
        {fieldControls}
      </div>
      <div className='flex justify-evenly'>
        {bottomButton}
      </div>
    </div>
  )
}
