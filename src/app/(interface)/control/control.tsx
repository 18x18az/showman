'use client'

import { Button } from '@/components/ui/button'
import { EmptyPost, JsonTopic } from '@/utils/maestro'
import { getResolutionText } from '@/utils/strings'
import { QualMatchBlockBroadcast, QueuedMatch } from '@18x18az/maestro-interfaces'
import { MatchControl } from './match-control'

export function startBlock () {
  void EmptyPost('queueing/nextBlock')
}

export default function ControlPage (): JSX.Element {
  const currentBlock = JsonTopic<QualMatchBlockBroadcast>('currentBlock', {} as any as QualMatchBlockBroadcast)
  const queuedMatches = JsonTopic<QueuedMatch[]>('queuedMatches', [])
  const currentMatch = JsonTopic<QueuedMatch>('currentMatch', {} as any as QueuedMatch)

  if (currentBlock !== null && Object.keys(currentBlock).length === 0) {
    return <>Loading</>
  }

  if (currentBlock === null) {
    return (
      <div>
        <Button onClick={startBlock}>Start the next block</Button>
      </div>
    )
  }

  const matches = queuedMatches.map((match) => {
    return <div className='text-lg' key={match.id}>{match.number} - {match.fieldName} - {getResolutionText(match.resolution)} </div>
  })

  // console.log(queuedMatches)
  console.log(currentMatch)

  return (
    <div className='flex gap-12'>
      <div className='flex-col'>
        {matches}
      </div>
      <MatchControl match={currentMatch} />
    </div>
  )
}
