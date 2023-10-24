'use client'

import { EmptyPost, StringTopic } from '@/utils/maestro'
import { GetTmConnection } from './tmSetup'
import UploadMatches from './upload'
import { Button } from '@/components/ui/button'
import { QualMatchControl } from './qualMatch'

enum STAGE {
  UNKNOWN = 'UNKNOWN',
  WAITING_FOR_TEAMS = 'WAITING_FOR_TEAMS',
  WAITING_FOR_MATCHES = 'WAITING_FOR_MATCHES',
  QUAL_MATCHES = 'QUAL_MATCHES'
}

export function LandingPage (): JSX.Element {
  const handleReset = () => {
    void EmptyPost('reset')
  }

  const stage = StringTopic('stage', STAGE.UNKNOWN)

  let content = <div>{stage}</div>

  if (stage === STAGE.UNKNOWN) {
    content = <div>Loading</div>
  } else if (stage === STAGE.WAITING_FOR_TEAMS) {
    content = <GetTmConnection />
  } else if (stage === STAGE.WAITING_FOR_MATCHES) {
    content = <UploadMatches />
  } else if (stage === STAGE.QUAL_MATCHES) {
    content = <QualMatchControl />
  }

  return (
    <div className='flex flex-col gap-24 justify-center content-center width-full'>
      {content}
      <div><Button onClick={handleReset}>Reset</Button></div>
    </div>
  )
}
