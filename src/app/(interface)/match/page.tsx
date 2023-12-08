'use client'
import { Alliance } from '../interfaces'
import Logo from '@/components/primitives/logo'
import { makeMatchName } from '@/app/display/field/[uuid]/field'
import { Button } from '@/components/ui/button'
import { EyeIcon, PlayIcon } from 'lucide-react'
import { pushLive, startMatch } from '@/contracts/match-control'
import { CompetitionFieldStatusSubscription, Field, LiveFieldSubscription, MATCH_STAGE, OnDeckFieldSubscription } from '@/contracts/fields'
import { TeamInformation, TeamsInformationSubscription } from '@/contracts/teams'
import { Match } from '../../../contracts/match'

function StartButton (props: { disabled: boolean }): JSX.Element {
  return <Button className='p-8' disabled={props.disabled} onClick={() => { void startMatch() }}><PlayIcon size={48} /></Button>
}

function DisplayButton (props: { disabled: boolean }): JSX.Element {
  return <Button className='p-8' disabled={props.disabled} onClick={() => { void pushLive() }}><EyeIcon size={48} /></Button>
}

function TeamDisplay (props: { team: string | undefined, teams: TeamInformation[] }): JSX.Element {
  if (props.team === undefined) return <></>
  const match = props.teams.find((team) => team.number === props.team)
  if (match === undefined) return <></>
  return (
    <div>
      <h4 className='text-center text-2xl'>{match.number}</h4>
      <h5 className='text-center text-xl text-slate-400'>{match.name}</h5>
    </div>
  )
}

function AllianceDisplay (props: { alliance: Alliance, color: 'red' | 'blue', teams: TeamInformation[] }): JSX.Element {
  const title = props.color === 'red' ? 'Red Alliance' : 'Blue Alliance'
  const fontColor = props.color === 'red' ? 'text-red-500' : 'text-blue-500'
  return (
    <div className='flex flex-col gap-2 mb-6'>
      <h3 className={`text-lg ${fontColor}`}>{title}</h3>
      <TeamDisplay team={props.alliance.team1} teams={props.teams} />
      <TeamDisplay team={props.alliance.team2} teams={props.teams} />
    </div>
  )
}

function PageContent (props: { match: Match, teams: TeamInformation[], field: Field, live: boolean, stage: MATCH_STAGE }): JSX.Element {
  const { match, teams, field, live, stage } = props
  const name = makeMatchName(match)

  const canStart = live && (stage === MATCH_STAGE.QUEUED || stage === MATCH_STAGE.SCORING_AUTON)

  return (
    <div className='flex flex-col gap-2 text-center p-4 justify-between h-full'>
      <h1 className='my-2 text-3xl text-slate-100'>{name}</h1>
      <h2 className='text-2xl mb-4 text-slate-500'>{field.name}</h2>
      <AllianceDisplay alliance={match.red} color='red' teams={teams} />
      <AllianceDisplay alliance={match.blue} color='blue' teams={teams} />
      <div className='flex-1 grow' />
      <div className='flex justify-evenly mb-12'>
        <DisplayButton disabled={live} />
        <StartButton disabled={!canStart} />
      </div>
    </div>
  )
}

function LiveFieldControl (props: { liveField: number, teams: TeamInformation[] }): JSX.Element {
  const liveFieldInfo = CompetitionFieldStatusSubscription(props.liveField)

  if (liveFieldInfo === undefined || liveFieldInfo.onField === null) {
    return <></>
  }

  return <PageContent match={liveFieldInfo.onField} teams={props.teams} field={liveFieldInfo.field} stage={liveFieldInfo.stage} live />
}

function NextFieldControl (props: { onDeckField: number, teams: TeamInformation[] }): JSX.Element {
  const onDeckFieldInfo = CompetitionFieldStatusSubscription(props.onDeckField)

  if (onDeckFieldInfo === undefined || onDeckFieldInfo.onField === null) {
    return <></>
  }

  return <PageContent match={onDeckFieldInfo.onField} teams={props.teams} field={onDeckFieldInfo.field} stage={onDeckFieldInfo.stage} live={false} />
}

export default function Page (): JSX.Element {
  const liveField = LiveFieldSubscription()
  const onDeckField = OnDeckFieldSubscription()
  const teams = TeamsInformationSubscription()

  if (liveField === undefined || onDeckField === undefined || teams === undefined) return <Logo />

  if (liveField !== null) {
    return <LiveFieldControl liveField={liveField} teams={teams} />
  } else if (onDeckField !== null) {
    return <NextFieldControl onDeckField={onDeckField} teams={teams} />
  } else {
    return <Logo />
  }
}
