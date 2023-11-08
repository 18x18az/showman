'use client'

import { EventStage, StageSubscription } from "@/contracts/stage"
import { CompetitionControl } from "./competition-control"

export default function Page(): JSX.Element {
    const stage = StageSubscription()

    if(stage === undefined) {
        return <></>
    } else if (stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {
        return <CompetitionControl />
    }
    
    return <div>
        {stage}
    </div>
}