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
    // const stage = JsonTopic<{stage: EventStage}>('stage')
    const displayStage = JsonTopic<{stage: StreamDisplayStage}>('displayStage')?.stage

    if(displayStage === undefined || active === undefined) return <></>

    if(displayStage === StreamDisplayStage.RESULTS) return <ScoreDisplay />
    else if(displayStage === StreamDisplayStage.MATCH && active !== null) return <MatchDisplay status={active}/>

    return <div>Nope</div>

    // if(stage === undefined) return <></>

    // if(stage.stage === EventStage.ALLIANCE_SELECTION) {
    //   return <AllianceSelection />
    // }

    // // find the status with a field name containing the field name in the url

    // if(statuses === undefined) return <></>

    // const status = statuses.find((s) => s.field.name.includes(params.field))

    // if(status === undefined) return <></>

    // const isActive = active !== undefined && active !== null && active.field.name === status.field.name

    // if(!isActive) return <ScoreDisplay />

    // if(displayControl === undefined || displayControl.stage === StreamDisplayStage.RESULTS) return <></>

    // return <MatchDisplay status={status} />
  }