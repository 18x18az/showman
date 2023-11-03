'use client'

import { Alliance, FieldState, FieldStatus, Round, ScheduledMatch } from '@/app/(interface)/interfaces'
import { JsonTopic } from '@/utils/maestro'
import { Countdown, Timer } from './timer'
import Logo from '@/components/primitives/logo'
import { StreamDisplayStage } from '@/app/(interface)/qualMatch'

interface FieldDisplayProps {
  readonly uuid: string
}

export function makeMatchName(match: ScheduledMatch| undefined): string {
  if (match === undefined) return ''
  
  const roundName = match.round === Round.Ro16 ? 'Round of 16' : match.round === Round.QF ? 'Quarterfinals' : match.round === Round.SF ? 'Semifinals' : match.round === Round.F ? 'Finals' : 'Qualification'

  return `${roundName} Match ${match.matchNum}`
}

interface AllianceDisplayProps {
  readonly alliance: Alliance | undefined
  readonly color: 'red' | 'blue'
}

function AllianceDisplay(props: AllianceDisplayProps): JSX.Element {
  if(props.alliance === undefined) return <></>

  const teams = [props.alliance.team1]
  if(props.alliance.team2 !== undefined) teams.push(props.alliance.team2)

  const teamDisplays = teams.map(team => {
    return <div key={team} className='text-8xl text-zinc-50 font-bold'>{team}</div>
  })

  const color = props.color === 'red' ? 'bg-red-600 text-right' : 'bg-blue-600 text-left'

  return <div className={`${color} rounded-lg w-96 p-4 font-mono`}>
    {teamDisplays}
  </div>
}

function ActualFieldDisplay(props: {fieldId: number}): JSX.Element {
  const topic = `fieldStatus/${props.fieldId}`
  const status = JsonTopic<FieldStatus>(topic)

  let body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className="mt-14" viewBox="0 0 350.417 279.405" style={{ width: "65%", height: "100%" }}/></div></div>
    
  if(status === undefined) return body
  if(status.match === null) return body

  const state = status.state
  

  const matchName = makeMatchName(status.match)
  const fieldName = status.field.name

  switch (state) {
    case FieldState.ON_DECK:
      let clock = <></>
      if(status.match.time !== undefined) clock = <Countdown time={status.match.time} />

      body = <>
       <h1 className='text-7xl text-zinc-300'>{matchName}</h1>
       <h2 className='text-9xl'>{clock}</h2>
       <div className='flex justify-between items-end'>
       <AllianceDisplay alliance={status.match.blue} color='blue' />
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        <AllianceDisplay alliance={status.match.red} color='red' />
        </div>
      </>
      break
    case FieldState.AUTO:
    case FieldState.DRIVER:
      let timer = <></>
      if(status.match.time !== undefined) timer = <Timer time={status.match.time} />

      body = <>
       <h1 className='text-7xl text-zinc-300'>{matchName}</h1>
       <h2 className='mt-14' style={{"fontSize": "250px"}}>{timer}</h2>
       <div className='flex justify-between items-end'>
       <AllianceDisplay alliance={status.match.blue} color='blue' />
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        <AllianceDisplay alliance={status.match.red} color='red' />
        </div>
      </>
      break
    case FieldState.SCORING:
      body = <>
          <h1 className='text-7xl text-zinc-300'>{matchName}</h1>
          <h2 className='text-9xl mb-12 text-zinc-100'>SCORING MATCH</h2>
          <div className='flex justify-between items-end'>
          <AllianceDisplay alliance={status.match.blue} color='blue' />
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        <AllianceDisplay alliance={status.match.red} color='red' />
        </div>
          </>
      break
    case FieldState.PAUSED:
      body = <>
       <h1 className='text-7xl text-zinc-300'>{matchName}</h1>
       <div className='flex justify-between items-end'>
       <AllianceDisplay alliance={status.match.blue} color='blue' />
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        <AllianceDisplay alliance={status.match.red} color='red' />
        </div>
      </>
      break
  }

  return body
}

interface DisplayConfig {
  readonly fieldId: number
}

export function FieldDisplay (props: FieldDisplayProps): JSX.Element {
  const topic = `displays/${props.uuid}`
  const fieldInfo = JsonTopic<DisplayConfig>(topic)
  const fieldControl = JsonTopic<FieldStatus | {state: null} >('fieldControl')
  const displayControl = JsonTopic<{stage: StreamDisplayStage}>('displayStage')

  const isCurrent = (fieldControl !== null && fieldControl !== undefined && fieldControl.state !== null && fieldInfo !== undefined && fieldInfo.fieldId === fieldControl.field.id && displayControl !== undefined && displayControl.stage === StreamDisplayStage.MATCH)

  let body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className="mt-14" viewBox="0 0 350.417 279.405" style={{ width: "65%", height: "100%" }}/></div></div>

  const background = isCurrent ? 'bg-zinc-700' : 'bg-zinc-900'

  if(fieldInfo !== undefined) {
    body = <ActualFieldDisplay fieldId={fieldInfo.fieldId} />
  }

  return (
    <div className={`bg-zinc-950 h-screen text-zinc-100 flex justify-evenly w-full`}>
      <div className='flex flex-col justify-evenly w-11/12'>
      <div className={`rounded-2xl ${background} h-5/6 w-full text-center flex flex-col justify-between font-sans p-8`}>
      {body}
      </div>
      </div>
    </div>
  )
}
