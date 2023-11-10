'use client'

import { EmptyPost, Post } from '@/utils/maestro'
import { GetTmConnection } from './tmSetup'
import UploadMatches from './upload'
import { Button } from '@/components/ui/button'
import { QualMatchControl } from './qualMatch'
import { EventStage, StageSubscription } from '@/contracts/stage'
import { AlliancSelectionControl } from './alliance'



function SceneControl (props: {name: string, number: number}): JSX.Element {
  return <div className='flex flex-col content-center text-center gap-2'>
    <h1>{props.name}</h1>
    <Button onClick={() => Post(`stream/ready`, {field: props.number})}>Preview</Button>
    <div className='flex gap-2'>
      <Button onClick={() => {void Post('stream/preset', {field: props.number, preset: 0})}}>0</Button>
      <Button onClick={() => {void Post('stream/preset', {field: props.number, preset: 1})}}>1</Button>
      <Button onClick={() => {void Post('stream/preset', {field: props.number, preset: 2})}}>2</Button></div>
  </div>
}

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
