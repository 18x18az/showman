import { MatchOverlay, MatchPeriod } from '@/components/objects/match/MatchOverlay'
import { MatchStage, useMatchOverlayQuery } from '../../../__generated__/graphql'
import { makeMatchName } from '../../../utils/strings/match'

export function MatchDisplay (): JSX.Element {
  const { data } = useMatchOverlayQuery({ pollInterval: 250 })
  const field = data?.competitionInformation.liveField

  if (field === undefined || field === null) return <></>

  const compInfo = field.competition

  if (compInfo === null) return <></>

  const sitting = compInfo.onFieldSitting

  if (sitting === null) return <></>

  const fieldControl = field.fieldControl

  if (fieldControl === null) return <></>

  const stage = compInfo.stage

  const matchName = makeMatchName(sitting)
  const period = stage === MatchStage.Auton ? MatchPeriod.Auto : stage === MatchStage.Driver ? MatchPeriod.Driver : MatchPeriod.None

  const redTeams = sitting.contest.redTeams
  const blueTeams = sitting.contest.blueTeams

  if (redTeams === null || blueTeams === null) return <></>

  let time: string | undefined

  if (fieldControl.endTime !== null) {
    time = fieldControl.endTime
  }

  return <MatchOverlay time={time} title={matchName} period={period} redTeams={redTeams} blueTeams={blueTeams} />
}
