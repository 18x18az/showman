'use client'

import { EmptyPost, JsonTopic, StringTopic } from "@/utils/maestro"
import { FieldState, FieldStatus } from "../interfaces"
import Logo from "@/components/primitives/logo"
import { makeMatchName } from "@/app/display/field/[uuid]/field"
import { Button } from "@/components/ui/button"

enum DisplayState {
    IDLE = 'IDLE',
    RESULTS = 'RESULTS',
    IN_MATCH = 'IN_MATCH'
  }

export default function Page (): JSX.Element {
    const fieldControl = JsonTopic<FieldStatus>('fieldControl', {state: FieldState.IDLE, name: 'None', id: 0})
    const displayControl = StringTopic<DisplayState>('displayState', DisplayState.IDLE)

    const match = fieldControl.match

    const cut = () => {
        void EmptyPost('cut')
      }

      const start = () => {
        void EmptyPost('start')
      }
      
      const resume = () => {
        void EmptyPost('resume')
      }

    let body = <Logo />

    if (match !== undefined) {

        const preIntro = displayControl === DisplayState.RESULTS || displayControl === DisplayState.IDLE

        const canStart = displayControl === DisplayState.IN_MATCH && fieldControl.state === FieldState.ON_DECK

        const canResume = displayControl === DisplayState.IN_MATCH && fieldControl.state === FieldState.PAUSED

        const name = makeMatchName(match)
        body = <div className="flex flex-col gap-8">
        <h1 className="my-2 text-xl">{name}</h1>
        <Button disabled={!preIntro} onClick={cut}>Show Match</Button>
        <Button disabled={!canStart} onClick={start}>Start</Button>
        <Button disabled={!canResume} onClick={resume}>Resume</Button>
        </div>
    }

    return (
        <>{body}</>
    )
}