'use client'

import { Alliance, Match, Round } from '@/app/(interface)/interfaces'
import { JsonTopic } from '@/utils/maestro'
import { Countdown, Timer } from './timer'
import Logo from '@/components/primitives/logo'
import { CONTROL_MODE, CompetitionFieldStatusSubscription, FieldControlStatus, FieldControlSubscription, LiveFieldSubscription, MATCH_STAGE } from '../../../../contracts/fields'

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

function FieldContent (props: { content: JSX.Element, match: Match | string, fieldName: string }): JSX.Element {
  const { content, match, fieldName } = props
  let blue = <></>
  let red = <></>

  let title = ''
  if (typeof match === 'string') {
    title = match
  } else {
    title = makeMatchName(match)
    blue = <AllianceDisplay alliance={match.blue} color='blue' />
    red = <AllianceDisplay alliance={match.red} color='red' />
  }

  return (
    <>
      <h1 className='text-7xl text-zinc-300'>{title}</h1>
      {content}
      <div className='flex justify-between items-end'>
        {red}
        <h2 className='text-7xl text-zinc-300'>{fieldName}</h2>
        {blue}
      </div>
    </>
  )
}

function SkillsDisplay (props: { fieldName: string, fieldControl: FieldControlStatus }): JSX.Element {
  const mode = props.fieldControl.mode
  const duration = props.fieldControl.duration
  let title = 'Skills Field'
  if (mode === CONTROL_MODE.AUTO && duration !== null) {
    title = 'Programming Skills'
  } else if (mode === CONTROL_MODE.DRIVER !== null && duration !== null) {
    title = 'Driver Skills'
  }

  const endTime = props.fieldControl.endTime
  let content = <></>
  if (endTime !== undefined && endTime !== null) {
    const clock = <Countdown time={endTime} />
    content = <h2 className='text-9xl'>{clock}</h2>
  }

  const body = <FieldContent content={content} fieldName={props.fieldName} match={title} />
  return body
}

function TimeoutDisplay (props: { match: Match, timeout: string, fieldName: string }): JSX.Element {
  const clock = <Timer time={props.timeout} />
  const content = <h2 className='text-9xl'>{clock}</h2>
  const body = <FieldContent content={content} match={props.match} fieldName={props.fieldName} />
  return body
}

function CompetitionDisplay (props: { fieldName: string, stage: MATCH_STAGE, match: Match, fieldControl: FieldControlStatus }): JSX.Element {
  const { stage, match, fieldControl } = props

  let content = <></>
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
  const body = <FieldContent content={content} match={props.match} fieldName={props.fieldName} />
  return body
}

function ActualFieldDisplay (props: { fieldId: number }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.fieldId)
  const fieldControl = FieldControlSubscription(props.fieldId)
  const timeout = JsonTopic<{ time: string | null }>('timeout')?.time ?? null

  const body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className='mt-14' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} /></div></div>

  if (status === undefined || status === null || fieldControl === undefined) return body

  const match = status.onField
  const stage = status.stage

  if (match === null) {
    return body
  }

  const fieldName = status.field.name

  if (status.field.isSkills) {
    return <SkillsDisplay fieldName={fieldName} fieldControl={fieldControl} />
  } else if (timeout !== null) {
    return <TimeoutDisplay match={match} timeout={timeout} fieldName={fieldName} />
  } else {
    return <CompetitionDisplay match={match} fieldName={fieldName} stage={stage} fieldControl={fieldControl} />
  }
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
