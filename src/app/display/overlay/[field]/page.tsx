'use client'

import { FieldStatus } from "@/app/(interface)/interfaces"
import { JsonTopic } from "@/utils/maestro"
import { ScoreDisplay } from "./score"
import { MatchDisplay } from "./match"
import { StreamDisplayStage } from "@/app/(interface)/qualMatch"

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {

    
    const statuses = JsonTopic<FieldStatus[]>('fieldStatuses')
    const active = JsonTopic<FieldStatus>('fieldControl')
    const displayControl = JsonTopic<{stage: StreamDisplayStage}>('displayStage')

    // find the status with a field name containing the field name in the url

    if(statuses === undefined) return <></>

    const status = statuses.find((s) => s.field.name.includes(params.field))

    if(status === undefined) return <></>

    const isActive = active !== undefined && active !== null && active.field.name === status.field.name

    if(!isActive) return <ScoreDisplay />

    if(displayControl === undefined || displayControl.stage === StreamDisplayStage.RESULTS) return <></>

    return <MatchDisplay status={status} />
  }