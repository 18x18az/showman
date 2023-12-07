'use client'

import { Alliance, Match, Round } from '@/app/(interface)/interfaces'
import { JsonTopic } from '@/utils/maestro'
import { Countdown, Timer } from './timer'
import Logo from '@/components/primitives/logo'
import { CompetitionFieldStatusSubscription, FieldControlSubscription, LiveFieldSubscription, MATCH_STAGE } from '../../../../contracts/fields'

interface FieldDisplayProps {
  readonly uuid: string
}

export function makeMatchName (match: Match | undefined | null): string {
  if (match === undefined || match === null) return ''

  const roundName = match.round === Round.Ro16 ? 'Round of 16' : match.round === Round.QF ? 'Quarterfinals' : match.round === Round.SF ? 'Semifinals' : match.round === Round.F ? 'Finals' : 'Qualification'

  return `${roundName} Match ${match.number}`
}

interface AllianceDisplayProps {
  readonly alliance: Alliance | undefined
  readonly color: 'red' | 'blue'
}

function AllianceDisplay (props: AllianceDisplayProps): JSX.Element {
  if (props.alliance === undefined) return <></>

  const teams = [props.alliance.team1]
  if (props.alliance.team2 !== undefined) teams.push(props.alliance.team2)

  const teamDisplays = teams.map(team => {
    return <div key={team} className='text-8xl text-zinc-50 font-bold'>{team}</div>
  })

  const color = props.color === 'red' ? 'bg-red-600 text-right' : 'bg-blue-600 text-left'

  return (
    <div className={`${color} rounded-lg w-96 p-4 font-mono`}>
      {teamDisplays}
    </div>
  )
}

function FieldContent (props: { content: JSX.Element, match: Match, fieldName: string }): JSX.Element {
  const { content, match, fieldName } = props

  const title = makeMatchName(match)

  return (
    <>
      <h1 className='text-7xl text-zinc-300'>{title}</h1>
      {content}
      <div className='flex justify-between items-end'>
        <AllianceDisplay alliance={match.blue} color='blue' />
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        <AllianceDisplay alliance={match.red} color='red' />
      </div>
    </>
  )
}

function ActualFieldDisplay (props: { fieldId: number }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.fieldId)
  const fieldControl = FieldControlSubscription(props.fieldId)
  const timeout = JsonTopic<{ time: string | null }>('timeout')

  let body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className='mt-14' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} /></div></div>

  if (status === undefined || status === null || fieldControl === undefined) return body

  const match = status.onField
  const stage = status.stage

  if (match === null) {
    return body
  }

  const fieldName = status.field.name
  let content = <></>

  if (timeout?.time !== undefined && timeout?.time !== null) {
    const clock = <Timer time={timeout.time} />
    content = <h2 className='text-9xl'>{clock}</h2>
  } else {
    let clock = <></>
    switch (stage) {
      case MATCH_STAGE.QUEUED:
        if (match.time !== undefined) clock = <Countdown time={match.time} />
        content = <h2 className='text-9xl'>{clock}</h2>
        break
      case MATCH_STAGE.AUTON:
      case MATCH_STAGE.DRIVER:
        if (fieldControl.endTime !== null) clock = <Timer time={fieldControl.endTime} />
        content = <h2 className='mt-14' style={{ fontSize: '250px' }}>{clock}</h2>
        break
      case MATCH_STAGE.OUTRO:
      case MATCH_STAGE.SCORING:
        content = <h2 className='text-9xl mb-12 text-zinc-100'>SCORING MATCH</h2>
        break
      case MATCH_STAGE.SCORING_AUTON:
        break
    }

    body = <FieldContent content={content} match={match} fieldName={fieldName} />
  }

  return body
}

interface DisplayConfig {
  readonly fieldId: number
}

export function FieldDisplay (props: FieldDisplayProps): JSX.Element {
  const topic = `displays/${props.uuid}`
  const config = JsonTopic<DisplayConfig>(topic)
  const liveField = LiveFieldSubscription()

  const isCurrent = (liveField !== undefined && liveField !== null && config !== undefined && liveField === config.fieldId)

  let body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className='mt-14' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} /></div></div>

  const background = isCurrent ? 'bg-zinc-700' : 'bg-zinc-900'

  if (config !== undefined) {
    body = <ActualFieldDisplay fieldId={config.fieldId} />
  }

  return (
    <div className='bg-zinc-950 h-screen text-zinc-100 flex justify-evenly w-full'>
      <div className='flex flex-col justify-evenly w-11/12'>
        <div className={`rounded-2xl ${background} h-5/6 w-full text-center flex flex-col justify-between font-sans p-8`}>
          {body}
        </div>
      </div>
    </div>
  )
}
