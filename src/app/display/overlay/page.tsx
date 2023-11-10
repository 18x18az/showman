'use client'

import { FieldStatus } from "@/app/(interface)/interfaces"
import { JsonTopic } from "@/utils/maestro"
import { ScoreDisplay } from "./score"
import { MatchDisplay } from "./match"
import { StreamDisplayStage } from "@/app/(interface)/qualMatch"
import { EventStage } from "@/contracts/stage"
import { AllianceSelection } from "./alliance"

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {

    
    // const statuses = JsonTopic<FieldStatus[]>('fieldStatuses')
    const active = JsonTopic<FieldStatus | null>('activeField')
    // const displayControl = JsonTopic<{stage: StreamDisplayStage}>('displayStage')
    const stage = JsonTopic<{stage: EventStage}>('stage')?.stage
    const displayStage = JsonTopic<{stage: StreamDisplayStage}>('displayStage')?.stage

    if(displayStage === undefined || active === undefined || stage === undefined) return <></>

    if(stage === EventStage.QUALIFICATIONS || stage === EventStage.ELIMS) {

    if(displayStage === StreamDisplayStage.RESULTS) return <ScoreDisplay />
    else if(displayStage === StreamDisplayStage.MATCH && active !== null) return <MatchDisplay status={active}/>
    else return <></>

    } else if(stage === EventStage.ALLIANCE_SELECTION) {
        return <AllianceSelection />
    }
    return <></>
  }