'use client'

import { EventStage, StageSubscription } from '@/contracts/stage'
import { AllianceSelectionControl } from '../alliance'
import TmSelector from './tm-connect'
import { CompetitionControl } from '@/components/views/competition-control/main'

export default function Page (): JSX.Element {
  const stage = StageSubscription()

  if (stage === undefined) {
    return <>Loading</>
  } else if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
    return <CompetitionControl />
  } else if (stage === EventStage.ALLIANCE_SELECTION) {
    return (
      <div className='flex flex-col gap-8 p-4'>
        <AllianceSelectionControl />
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
