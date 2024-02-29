import { TeamInformationFragment } from '../../../__generated__/graphql'
import { LogoReelCorner } from '../../ui/logos/logo-reel-corner'
import { AllianceIndicator } from './AllianceIndicator'
import { MatchName } from './MatchName'
import { PeriodIndicator } from './PeriodIndicator'
import { Timer } from './Timer'

export enum MatchPeriod {
  Auto = 'auto',
  Driver = 'driver',
  None = 'none'
}

interface MatchOverlayProps {
  readonly redTeams: TeamInformationFragment[]
  readonly blueTeams: TeamInformationFragment[]
  readonly time: string | undefined
  readonly period: MatchPeriod
  readonly title: string
}

export function MatchOverlay (props: MatchOverlayProps): JSX.Element {
  return (
    <>
      <MatchName match={props.title} time={120} phase='auto' />
      <AllianceIndicator alliance='red' teams={props.redTeams} />
      <AllianceIndicator alliance='blue' teams={props.blueTeams} />
      <LogoReelCorner />
      <Timer time={props.time} period={props.period} />
      <PeriodIndicator period={props.period} />
    </>
  )
}
