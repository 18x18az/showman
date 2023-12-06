import { makeShortMatchName } from '@/utils/strings/match'
import { Button } from '@/components/ui/button'
import { PlayIcon, ReloadIcon, ResetIcon, StopIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { offsetTimer } from '@/app/display/field/[uuid]/timer'
import { CompetitionFieldStatusSubscription, FieldControlStatus, FieldControlSubscription, LiveFieldSubscription, MATCH_STAGE } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { endEarly, replayCurrentMatch, resetMatch, startMatch } from '@/contracts/match-control'

function makeTime (offset: number, truncate = false): string {
  if (truncate && offset < 0) {
    return '0:00'
  }

  const time = Math.ceil(offset / 1000)
  const minutes = Math.floor(time / 60).toString()
  const seconds = (time % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

function StartButton (props: { disabled: boolean }): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='secondary' disabled={props.disabled} onClick={() => { void startMatch() }}><PlayIcon /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Start Match</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function StopButton (): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='secondary' onClick={() => { void endEarly() }}><StopIcon /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>End Early</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ResetButton (props: { disabled: boolean }): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={props.disabled} variant='secondary' onClick={() => { void resetMatch() }}><ResetIcon /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset Match</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ReplayButton (props: { disabled: boolean }): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={props.disabled} variant='secondary' onClick={() => { void replayCurrentMatch() }}><ReloadIcon /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Replay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function MatchControlContent (props: { match: Match | null, stage: MATCH_STAGE, control: FieldControlStatus | null }): JSX.Element {
  const match = props.match
  const stage = props.stage
  const matchName = match !== null ? makeShortMatchName(match) : '-'

  let canStart = false
  if (stage === MATCH_STAGE.QUEUED || stage === MATCH_STAGE.SCORING_AUTON) {
    canStart = true
  }

  let canEnd = false
  if (stage === MATCH_STAGE.AUTON || stage === MATCH_STAGE.DRIVER) {
    canEnd = true
  }

  let canReset = false
  if (stage === MATCH_STAGE.SCORING_AUTON) {
    canReset = true
  }

  let canReplay = false
  if (stage === MATCH_STAGE.QUEUED || stage === MATCH_STAGE.SCORING_AUTON || stage === MATCH_STAGE.OUTRO) {
    canReplay = true
  }

  let timeText = <>-:--</>

  if (match !== null && props.control !== null && props.control.endTime !== null) {
    const offset = offsetTimer(props.control.endTime)
    timeText = <>{makeTime(offset)}</>
  }

  let startStopButton = <StartButton disabled={!canStart} />
  if (canEnd) {
    startStopButton = <StopButton />
  }

  return (
    <div>
      <h1 className='text-center text-2xl text-zinc-600 mb-3'>Match</h1>
      <h2 className='text-center text-4xl text-zinc-400 mb-4'>{matchName}</h2>
      <h2 className='text-center text-3xl font-mono text-zinc-400 mb-4'>{timeText}</h2>
      <div className='flex justify-evenly gap-4'>
        <ResetButton disabled={!canReset} />
        {startStopButton}
        <ReplayButton disabled={!canReplay} />
      </div>
    </div>
  )
}

function EmptyMatchControl (): JSX.Element {
  return <MatchControlContent match={null} stage={MATCH_STAGE.EMPTY} control={null} />
}

function PopulatedMatchControl (props: { fieldId: number }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.fieldId)
  const fieldControl = FieldControlSubscription(props.fieldId) ?? null

  let match: Match | null = null
  const stage = status?.stage ?? MATCH_STAGE.EMPTY

  if (status?.onField !== null) {
    match = status?.onField ?? null
  }

  return <MatchControlContent match={match} stage={stage} control={fieldControl} />
}
export function MatchControl (): JSX.Element {
  const liveField = LiveFieldSubscription()

  if (liveField === undefined || liveField === null) {
    return <EmptyMatchControl />
  } else {
    return <PopulatedMatchControl fieldId={liveField} />
  }
}
