'use client'

import { BaseStatus, StatusTopic } from "@/utils/maestro";
import { GetTmConnection } from "../../tmSetup";

export default function Page(): JSX.Element {
    const tmStatus = StatusTopic('tm')
    const disabled = (tmStatus === undefined || tmStatus === BaseStatus.NOMINAL)

    if(disabled) {
        return <>TM already configured</>
    } else {
        return <GetTmConnection />
    }
}
