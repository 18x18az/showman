import { MatchOverlay, MatchPeriod } from '@/components/objects/match/MatchOverlay'
import { makeMatchName } from '../field/[uuid]/field'
import { CompetitionFieldStatusSubscription, FieldControlSubscription, MATCH_STAGE } from '../../../contracts/fields'

interface MatchDisplayProps {
  field: number
}

export function MatchDisplay (props: MatchDisplayProps): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.field)
  const fieldControl = FieldControlSubscription(props.field)

  if (status === undefined || status.onField === null || fieldControl === undefined) return <></>
  const match = status.onField
  const stage = status.stage

  const matchName = makeMatchName(match)
  const period = stage === MATCH_STAGE.AUTON ? MatchPeriod.Auto : stage === MATCH_STAGE.DRIVER ? MatchPeriod.Driver : MatchPeriod.None

  const redTeams = [match.red.team1]
  if (match.red.team2 !== undefined) redTeams.push(match.red.team2)
  const blueTeams = [match.blue.team1]
  if (match.blue.team2 !== undefined) blueTeams.push(match.blue.team2)

  let time: string | undefined

  if (fieldControl.endTime !== null) {
    time = fieldControl.endTime
  }

  return <MatchOverlay time={time} title={matchName} period={period} redTeams={redTeams} blueTeams={blueTeams} />
}
