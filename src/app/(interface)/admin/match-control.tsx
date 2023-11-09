import { makeShortMatchName } from "@/utils/strings/match"
import { FieldState, FieldStatus, Match } from "../interfaces"
import { Button } from "@/components/ui/button"
import { PlayIcon, ReloadIcon, ResetIcon, StopIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { EmptyPost } from "@/utils/maestro"
import { offsetTimer } from "@/app/display/field/[uuid]/timer"

interface MatchControlProps {
    active: FieldStatus | null
}

function makeTime(offset: number, truncate=false): string {
    if(truncate && offset < 0) {
      return '0:00'
    }
  
    const time = Math.ceil(offset / 1000)
    const minutes = Math.floor(time / 60).toString()
    const seconds = (time % 60).toString().padStart(2, '0')
  
    return `${minutes}:${seconds}`
  }

function StartButton(props: {disabled: boolean}): JSX.Element {
    const handler = async () => {
        await EmptyPost('fieldControl/start')
    }

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button variant='secondary' disabled={props.disabled} onClick={() => {void handler()}}><PlayIcon /></Button></TooltipTrigger>
        <TooltipContent>
            <p>Start Match</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

function StopButton(): JSX.Element {
    const handler = async () => {
        await EmptyPost('fieldControl/endEarly')
    }

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button variant='secondary' onClick={() => {void handler()}}><StopIcon /></Button></TooltipTrigger>
        <TooltipContent>
            <p>End Early</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

function ResetButton(props: {disabled: boolean}): JSX.Element {
    const handler = async () => {
        await EmptyPost('fieldControl/reset')
    }

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button disabled={props.disabled} variant='secondary' onClick={() => {void handler()}}><ResetIcon /></Button></TooltipTrigger>
        <TooltipContent>
            <p>Reset Match</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

function ReplayButton(props: {disabled: boolean}): JSX.Element {
    const handler = async () => {
        await EmptyPost('fieldControl/replay')
    }

    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button disabled={props.disabled} variant='secondary' onClick={() => {void handler()}}><ReloadIcon /></Button></TooltipTrigger>
        <TooltipContent>
            <p>Replay</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

export function MatchControl(props: MatchControlProps): JSX.Element {
    const match: Match | null = props.active?.match ?? null
    const matchName = match !== null ? makeShortMatchName(match) : '-'

    let canStart = false
    let canEnd = false
    let canReset = false
    let canReplay = false
    let timeText = <>-:--</>
    
    if(props.active !== null) {
        const state = props.active.state

        if(state !== FieldState.ON_DECK) {
            canReset = true
        } else {
            canReplay = true
        }

        if(state === FieldState.ON_DECK || state === FieldState.PAUSED) {
            canStart = true
            if(state === FieldState.PAUSED) {
                timeText = <>1:45</>
            } else {
                timeText = <>0:15</>
            }
        } else if (state === FieldState.AUTO || state === FieldState.DRIVER) {
            if(props.active.endTime !== null) {
                const offset = offsetTimer(props.active.endTime)
                timeText = <>{makeTime(offset)}</>
            }
            canEnd = true
        }
    }

    let startStopButton = <StartButton disabled={!canStart} />
    if(canEnd) {
        startStopButton = <StopButton />
    }

    const startMatch = async () => {
        EmptyPost('fieldControl/start')
    }

  return <div>
    <h1 className="text-center text-2xl text-zinc-600 mb-3">Match</h1>
    <h2 className="text-center text-4xl text-zinc-400 mb-4">{matchName}</h2>
    <h2 className="text-center text-3xl font-mono text-zinc-400 mb-4">{timeText}</h2>
    <div className="flex justify-evenly gap-4">
        <ResetButton disabled={!canReset} />
        {startStopButton}
        <ReplayButton disabled={!canReplay} />
    </div>
  </div>
}