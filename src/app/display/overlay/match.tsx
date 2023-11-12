import { FieldState, FieldStatus } from '@/app/(interface)/interfaces'
import { MatchOverlay, MatchPeriod } from '@/components/objects/match/MatchOverlay'
import { makeMatchName } from '../field/[uuid]/field'

interface MatchDisplayProps {
  status: FieldStatus
}

export function MatchDisplay (props: MatchDisplayProps): JSX.Element {
  const match = props.status.match
  if (match === undefined || match === null) return <></>

  const matchName = makeMatchName(match)
  const period = props.status.state === FieldState.AUTO ? MatchPeriod.Auto : props.status.state === FieldState.DRIVER ? MatchPeriod.Driver : MatchPeriod.None

  const redTeams = [match.red.team1]
  if (match.red.team2 !== undefined) redTeams.push(match.red.team2)
  const blueTeams = [match.blue.team1]
  if (match.blue.team2 !== undefined) blueTeams.push(match.blue.team2)

  let time: string | undefined

  if (props.status.endTime !== null) {
    time = props.status.endTime
  }

  return <MatchOverlay time={time} title={matchName} period={period} redTeams={redTeams} blueTeams={blueTeams} />
}
