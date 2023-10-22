'use client'

import { Button } from "@/components/ui/button"
import { EmptyPost, JsonTopic } from "@/utils/maestro"
import { getResolutionText } from "@/utils/strings"
import { QualMatchBlockBroadcast, QueuedMatch } from "@18x18az/maestro-interfaces"

export function startBlock() {
    void EmptyPost('queueing/nextBlock')
}

export default function ControlPage(): JSX.Element {

    const currentBlock = JsonTopic<QualMatchBlockBroadcast>('currentBlock', {} as any as QualMatchBlockBroadcast)
    console.log(currentBlock)

    const queuedMatches = JsonTopic<QueuedMatch[]>('queuedMatches', [])
    console.log(queuedMatches)

    if(currentBlock === {} as any as QualMatchBlockBroadcast) {
        return <>Loading</>
    }

    if(currentBlock === null) {
        return <div>
            <Button onClick={startBlock}>Start the next block</Button>
        </div>
    }

    const matches = queuedMatches.map((match) => {
        return <div className="text-lg" key={match.id}>{match.number} - {match.fieldName} - {getResolutionText(match.resolution)} </div>
    })

  return <>{matches}</>
}