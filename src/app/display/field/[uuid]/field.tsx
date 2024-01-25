'use client'
import { MatchStage, SittingWithTeamsFragment, TeamInformationFragment, useFieldDisplayQuery } from '../../../../__generated__/graphql'
import { makeMatchName } from '../../../../utils/strings/match'
import { Countdown, Timer } from './timer'
import Logo from '@/components/primitives/logo'
interface FieldDisplayProps {
  readonly uuid: string
}

function AllianceDisplay (props: { alliance: TeamInformationFragment[], color: 'red' | 'blue' }): JSX.Element {
  const teams = props.alliance

  const teamDisplays = teams.map(team => {
    return <div key={team.id} className='text-8xl text-zinc-50 font-bold'>{team.number}</div>
  })

  const color = props.color === 'red' ? 'bg-red-600 text-right' : 'bg-blue-600 text-left'

  return (
    <div className={`${color} rounded-lg w-96 p-4 font-mono`}>
      {teamDisplays}
    </div>
  )
}

function FieldContent (props: { content: JSX.Element, sitting: SittingWithTeamsFragment, fieldName: string }): JSX.Element {
  const { content, sitting, fieldName } = props
  let blue = <></>
  let red = <></>

  const title = makeMatchName(sitting)
  blue = <AllianceDisplay alliance={sitting.contest.blueTeams} color='blue' />
  red = <AllianceDisplay alliance={sitting.contest.redTeams} color='red' />

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

function CompetitionDisplay (props: { sitting: SittingWithTeamsFragment, stage: MatchStage, fieldName: string, endTime: string | null, time: string | null }): JSX.Element {
  const { sitting, stage, fieldName, endTime, time } = props

  let content = <></>
  let clock = <></>
  switch (stage) {
    case MatchStage.Queued:
      if (time !== null) clock = <Countdown time={time} />
      content = <h2 className='text-9xl'>{clock}</h2>
      break
    case MatchStage.Auton:
    case MatchStage.Driver:
      if (endTime !== null) clock = <Timer time={endTime} />
      content = <h2 className='mt-14' style={{ fontSize: '250px' }}>{clock}</h2>
      break
    case MatchStage.Scoring:
      content = <h2 className='text-9xl mb-12 text-zinc-100'>SCORING MATCH</h2>
      break
    case MatchStage.ScoringAuton:
      break
  }
  const body = <FieldContent content={content} sitting={sitting} fieldName={fieldName} />
  return body
}

interface FieldInterface {
  readonly name: string
  readonly fieldControl: {
    endTime: string | null
  } | null
  readonly competition: {
    stage: MatchStage
    onFieldSitting: SittingWithTeamsFragment | null
  } | null
}

function ActualFieldDisplay (props: { field: FieldInterface }): JSX.Element {
  const body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className='mt-14' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} /></div></div>

  const compInfo = props.field.competition
  const compStage = compInfo?.stage
  if (compStage === undefined) return body

  const sitting = compInfo?.onFieldSitting

  if (sitting === null) {
    return body
  }

  const endTime = props.field.fieldControl?.endTime ?? null
  const time = sitting?.scheduled

  const fieldName = props.field.name

  const isSkills = false
  const timeout = null

  // if (isSkills) {
  //   return <SkillsDisplay fieldName={fieldName} fieldControl={fieldControl} />
  // } else if (timeout !== null) {
  //   return <TimeoutDisplay match={match} timeout={timeout} fieldName={fieldName} />
  // } else {
  //   return <CompetitionDisplay sitting={sitting} fieldName={fieldName} />
  // }

  if (sitting !== undefined) {
    return <CompetitionDisplay sitting={sitting} stage={compStage} fieldName={fieldName} endTime={endTime} time={time} />
  }

  return body
}

export function FieldDisplay (props: FieldDisplayProps): JSX.Element {
  let body = <div className='flex flex-col justify-evenly h-full w-full'><div className='flex justify-evenly'><Logo className='mt-14' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} /></div></div>
  const { data } = useFieldDisplayQuery({ variables: { uuid: props.uuid }, pollInterval: 250 })
  const field = data?.display.field

  if (field !== undefined && field !== null) body = <ActualFieldDisplay field={field} />

  const isCurrent = (field?.competition === undefined || field.competition === null || field.competition.isLive === true)
  const background = isCurrent ? 'bg-zinc-700' : 'bg-zinc-900'

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
