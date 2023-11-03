'use client'

import { EmptyPost } from '@/utils/maestro'
import { GetTmConnection } from './tmSetup'
import UploadMatches from './upload'
import { Button } from '@/components/ui/button'
import { QualMatchControl } from './qualMatch'
import { EventStage, StageSubscription } from '@/contracts/stage'
import { AlliancSelectionControl } from './alliance'

export function LandingPage (): JSX.Element {
  const handleReset = () => {
    void EmptyPost('stage/reset')
  }

  const stage = StageSubscription()

  let content = <div>{stage}</div>

  if (stage === undefined) {
    content = <div>Loading</div>
  } else if (stage === EventStage.WAITING_FOR_TEAMS) {
    content = <GetTmConnection />
  } else if (stage === EventStage.CHECKIN) {
    content = <UploadMatches />
  } else if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
    content = <QualMatchControl />
  } else if (stage === EventStage.ALLIANCE_SELECTION) {
    content = <AlliancSelectionControl />
  }

  return (
    <div className='flex flex-col gap-24 justify-center content-center width-full'>
      {content}
      <div><Button onClick={handleReset}>Reset</Button></div>
    </div>
  )
}
