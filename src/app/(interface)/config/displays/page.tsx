'use client'

import { DisplayConfig } from '@18x18az/maestro-interfaces'
import { JsonTopic } from '@/utils/maestro'

export default function Page(): JSX.Element {
    const displays = JsonTopic<DisplayConfig[]>('displays', [])
    console.log(displays)
    return <>{JSON.stringify(displays)}</>
}