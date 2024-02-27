'use client'
import { Round, TeamInformationFragment, useResultsQuery } from '../../../__generated__/graphql'
import { roundName } from '../../../utils/strings/match'
import { LogoFallback } from './fallback'

interface TeamInfoProps {
  team: TeamInformationFragment
}

function TeamInfo (props: TeamInfoProps): JSX.Element {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-8xl'>{props.team.number}</h1>
      <h2 className='text-3xl'>{props.team.name}</h2>
    </div>
  )
}

interface AllianceInfoProps {
  teams: TeamInformationFragment[]
  color: 'red' | 'blue'
}

function AllianceInfo (props: AllianceInfoProps): JSX.Element {
  const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

  const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-10' : 'border-l-8 border-blue-9 pl-10'

  const teams = props.teams.map(team => <TeamInfo key={team.id} team={team} />)

  return (
    <div className={`bg-zinc-900 ${color} w-4/12 p-4 opacity-[0.97]`}>
      <div className={`flex flex-col gap-10 py-6 ${border}`}>
        {teams}
      </div>
    </div>
  )
}

interface ScoreProps {
  score: number
  color: 'red' | 'blue'
}

function Score (props: ScoreProps): JSX.Element {
  const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

  const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-10' : 'border-l-8 border-blue-9 pl-10'

  return (
    <div className={`bg-zinc-900 opacity-[0.97] p-4 ${color}`}>
      <div className={`${border} py-6 w-72`}>
        <h1 className='text-8xl'>{props.score}</h1>
      </div>
    </div>
  )
}

interface ScoresProps {
  redScore: number
  blueScore: number
}

function Scores (props: ScoresProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-4'>
      <Score score={props.redScore} color='red' />
      <Score score={props.blueScore} color='blue' />
    </div>
  )
}

interface AlliancesInfoProps {
  redTeams: TeamInformationFragment[]
  blueTeams: TeamInformationFragment[]
}

function AlliancesInfo (props: AlliancesInfoProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-4'>
      <AllianceInfo teams={props.redTeams} color='red' />
      <AllianceInfo teams={props.blueTeams} color='blue' />
    </div>
  )
}

function makeMatchName (round: Round, contest: number, match: number): string {
  const roundString = roundName(round)
  const matchString = match > 1 ? `-${match}` : ''

  return `${roundString} Match ${contest}${matchString}`
}

export function ResultDisplay (): JSX.Element {
  const { data } = useResultsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <LogoFallback />
  }

  const match = data.results.displayedResults
  const results = match?.savedScore

  if (match === null || results === null) {
    return <LogoFallback />
  }

  const redScore = match.savedScore?.red.score
  const blueScore = match.savedScore?.blue.score

  if (redScore === undefined || blueScore === undefined) {
    return <LogoFallback />
  }

  const contest = match.contest

  const matchName = makeMatchName(contest.round, contest.number, match.number)

  return (
    <div className='flex flex-col text-center items-center w-full gap-8 text-zinc-200 mt-4'>
      <h1 className='bg-zinc-900 w-10/12 text-7xl py-6 mt-16 rounded-lg font-sans mb-20 opacity-[0.97]'>{matchName} Results</h1>
      <AlliancesInfo redTeams={contest.redTeams} blueTeams={contest.blueTeams} />
      <Scores redScore={redScore} blueScore={blueScore} />
    </div>
  )
}
