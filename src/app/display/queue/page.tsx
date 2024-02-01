'use client'
import { MatchStage, SittingWithTeamsFragment, useQueueDisplayQuery } from '../../../__generated__/graphql'
import { makeShortMatchName } from '../../../utils/strings/match'

interface FieldInfo {
  name: string
  competition: {
    stage: MatchStage
    onFieldSitting: SittingWithTeamsFragment | null
    onTableSitting: SittingWithTeamsFragment | null
  } | null
}

function Teams (props: { number: string }): JSX.Element {
  return <h2>{props.number}</h2>
}

function Alliance (props: { teams: Array<{ id: number, number: string }>, color: 'red' | 'blue' }): JSX.Element {
  const teams = props.teams.map((team) => {
    return <Teams key={team.id} number={team.number} />
  })

  const color = props.color === 'red' ? 'text-red-9 text-left' : 'text-blue-9 text-right'

  return (
    <div className={`${color} text-3xl font-mono`}>
      {teams}
    </div>
  )
}

function Alliances (props: { sitting: SittingWithTeamsFragment }): JSX.Element {
  return (
    <div className='flex justify-between'>
      <Alliance teams={props.sitting.contest.redTeams} color='red' />
      <Alliance teams={props.sitting.contest.blueTeams} color='blue' />
    </div>
  )
}

function OnField (props: { sitting: SittingWithTeamsFragment | null, stage: MatchStage | null }): JSX.Element {
  const { sitting, stage } = props
  let title = ''
  let teams = <></>

  if (sitting !== null) {
    title = makeShortMatchName(sitting)
    teams = <Alliances sitting={sitting} />
  }

  let text = ''
  if (stage === MatchStage.Scoring) {
    text = 'Scoring'
  }

  return (
    <div className='bg-zinc-900 w-96 h-72 align-center rounded-lg p-4 flex flex-col'>
      <h1 className='text-4xl text-zinc-500'>{title}</h1>
      <h2 className='text-4xl text-zinc-100 mt-12'>{text}</h2>
      <div className='grow' />
      {teams}
    </div>
  )
}

function OnTable (props: { sitting: SittingWithTeamsFragment | null }): JSX.Element {
  const { sitting } = props

  let title = ''
  let teams = <></>

  if (sitting !== null) {
    title = makeShortMatchName(sitting)
    teams = <Alliances sitting={sitting} />
  }

  return (
    <div className='bg-zinc-900 w-96 h-72 align-center rounded-lg p-4 flex flex-col'>
      <h1 className='text-4xl text-zinc-500'>{title}</h1>
      <div className='grow' />
      {teams}
    </div>
  )
}

function Field (props: FieldInfo): JSX.Element {
  const onTableSitting = props.competition?.onTableSitting ?? null
  const onFieldSitting = props.competition?.onFieldSitting ?? null
  const stage = props.competition?.stage ?? null
  return (
    <div className='flex flex-col gap-24 rounded-lg'>
      <h1 className='text-5xl text-zinc-100'>{props.name}</h1>
      <OnField sitting={onFieldSitting} stage={stage} />
      <OnTable sitting={onTableSitting} />
    </div>
  )
}

export default function Page (): JSX.Element {
  const { data } = useQueueDisplayQuery({ pollInterval: 250 })

  let content: JSX.Element | JSX.Element[] = <></>

  if (data !== undefined) {
    content = data.fields.map((field) => {
      return <Field key={field.id} name={field.name} competition={field.competition} />
    })
  }

  return (
    <div className='flex w-full h-full bg-zinc-800 justify-evenly py-24 text-center'>
      {content}
    </div>
  )
}
