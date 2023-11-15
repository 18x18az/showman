'use client'

import { EventStage, StageSubscription } from '@/contracts/stage'
import { CompetitionControl } from './competition-control'
import { AlliancSelectionControl } from '../alliance'
import TmSelector from './tm-connect'

export default function Page (): JSX.Element {
  const stage = StageSubscription()

  if (stage === undefined) {
    return <></>
  } else if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
    return <CompetitionControl />
  } else if (stage === EventStage.ALLIANCE_SELECTION) {
    return (
      <div className='flex flex-col gap-8 p-4'>
        <AlliancSelectionControl />
      </div>
    )
  } else if (stage === EventStage.WAITING_FOR_TEAMS) {
    return <TmSelector />
  }

  return (
    <div>
      {stage}
    </div>
  )
}
