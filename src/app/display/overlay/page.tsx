'use client'
import { ScoreDisplay } from './score'
import { MatchDisplay } from './match'
import { EventStage, StageSubscription } from '@/contracts/stage'
import { AllianceSelection } from './alliance'
import { LiveFieldSubscription } from '../../../contracts/fields'
import { DisplayStageSubscription, DisplayState } from '../../../contracts/display'

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {
  // const statuses = JsonTopic<FieldStatus[]>('fieldStatuses')
  const active = LiveFieldSubscription()
  const stage = StageSubscription()
  const displayStage = DisplayStageSubscription()

  if (active === undefined || stage === undefined || displayStage === undefined) return <></>

  if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
    if (displayStage === DisplayState.RESULTS) return <ScoreDisplay />
    else if (displayStage === DisplayState.MATCH && active !== null) return <MatchDisplay field={active} />
  } else if (stage === EventStage.ALLIANCE_SELECTION) {
    return <AllianceSelection />
  }
  return <></>
}
