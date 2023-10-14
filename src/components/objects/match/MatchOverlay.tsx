import { AllianceIndicator } from './AllianceIndicator'
import { MatchName } from './MatchName'
import { PeriodIndicator } from './PeriodIndicator'
import { Timer } from './Timer'

interface MatchOverlayProps {
  readonly redTeams: string[]
  readonly blueTeams: string[]
  readonly autoWinner: 'red' | 'blue' | 'tie' | null
  readonly time: number | null
  readonly period: 'auto' | 'driver' | 'none'
}

export function MatchOverlay (props: MatchOverlayProps): JSX.Element {
  return (
    <>
      <MatchName match='Qualification Match 23' time={120} phase='auto' />
      <AllianceIndicator alliance='red' teams={props.redTeams} wonAuto={props.autoWinner === 'red'} />
      <AllianceIndicator alliance='blue' teams={props.blueTeams} wonAuto={props.autoWinner === 'blue'} />
      <Timer time={props.time} period={props.period} />
      <PeriodIndicator period={props.period} />
    </>
  )
}