'use client'
import { ScoreDisplay } from './score'
import { MatchDisplay } from './match'
import { EventStage, StageSubscription } from '@/contracts/stage'
import { AllianceSelection } from './alliance'
import { LiveFieldSubscription } from '../../../contracts/fields'

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {
  // const statuses = JsonTopic<FieldStatus[]>('fieldStatuses')
  const active = LiveFieldSubscription()
  const stage = StageSubscription()

  if (active === undefined || stage === undefined) return <></>

  if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
    if (active === null) return <ScoreDisplay />
    else return <MatchDisplay field={active} />
  } else if (stage === EventStage.ALLIANCE_SELECTION) {
    return <AllianceSelection />
  }
  return <></>
}
