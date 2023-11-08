'use client'

import RestButton from "@/components/ui/rest-button"
import { JsonTopic } from "@/utils/maestro"
import { FieldControl } from "./field-control"

export function CompetitionControl(): JSX.Element {
    const block = JsonTopic<{block: string | null}>('block')

    if(block === undefined) {
        return <>No block</>
    }

    if(block.block === null) {
        return <div><RestButton url='matches/proceed' text='Queue Next Block' pendingText={'Loading...'} className='w-48'/></div>
    }

    return <div className="flex w-full p-8 gap-8 h-screen">
        <div className="p-6 rounded-lg flex-1"><FieldControl/></div>
        <div className="flex flex-col gap-8">
            <div className="border border-zinc-800 p-8 rounded-xl">Other stuff</div>
            <div className="border border-zinc-800 p-8 rounded-xl flex-1">Schedule and Stuff</div>
        </div>
    </div>
}