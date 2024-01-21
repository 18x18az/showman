import { makeShortMatchName } from '@/utils/strings/match'
import { Button } from '@/components/ui/button'
import { PlayIcon, ReloadIcon, ResetIcon, StopIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { offsetTimer } from '@/app/display/field/[uuid]/timer'
import { SittingIdentifier } from './field-info/interfaces'
import { MatchStage, useLiveFieldQuery } from '../../../__generated__/graphql'

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
          <Button variant='secondary' disabled={props.disabled} onClick={() => { }}><PlayIcon /></Button>
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
          <Button variant='secondary' onClick={() => { }}><StopIcon /></Button>
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
          <Button disabled={props.disabled} variant='secondary' onClick={() => { }}><ResetIcon /></Button>
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
          <Button disabled={props.disabled} variant='secondary' onClick={() => { }}><ReloadIcon /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Replay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function MatchControlContent (props: { sitting: SittingIdentifier | null, stage: MatchStage, endTime: string | null }): JSX.Element {
  const { sitting, stage, endTime } = props
  const sittingName = sitting !== null ? makeShortMatchName(sitting) : '-'

  let canStart = false
  if (stage === MatchStage.Queued || stage === MatchStage.ScoringAuton) {
    canStart = true
  }

  let canEnd = false
  if (stage === MatchStage.Auton || stage === MatchStage.Driver) {
    canEnd = true
  }

  let canReset = false
  if (stage === MatchStage.ScoringAuton) {
    canReset = true
  }

  let canReplay = false
  if (stage === MatchStage.Queued || stage === MatchStage.ScoringAuton || stage === MatchStage.Scoring) {
    canReplay = true
  }

  let timeText = <>-:--</>

  if (endTime !== null) {
    const offset = offsetTimer(endTime)
    timeText = <>{makeTime(offset)}</>
  }

  let startStopButton = <StartButton disabled={!canStart} />
  if (canEnd) {
    startStopButton = <StopButton />
  }

  return (
    <div>
      <h1 className='text-center text-2xl text-zinc-600 mb-3'>Match</h1>
      <h2 className='text-center text-4xl text-zinc-400 mb-4'>{sittingName}</h2>
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
  return <MatchControlContent sitting={null} stage={MatchStage.Empty} endTime={null} />
}

function PopulatedMatchControl (props: { sitting: SittingIdentifier, stage: MatchStage, endTime: string | null }): JSX.Element {
  return <MatchControlContent sitting={props.sitting} stage={props.stage} endTime={props.endTime} />
}

export function MatchControl (): JSX.Element {
  const { data } = useLiveFieldQuery()
  const competition = data?.competitionInformation?.liveField?.competition
  const sitting = competition?.onFieldSitting
  if (competition === null || competition === undefined || sitting === null || sitting === undefined) {
    return <EmptyMatchControl />
  } else {
    const sitingIdent = {
      id: sitting.id,
      contest: sitting.contest.number,
      round: sitting.contest.round,
      match: sitting.match.number
    }
    const endTime = data?.competitionInformation?.liveField?.fieldControl?.endTime
    const stage = competition.stage
    return <PopulatedMatchControl sitting={sitingIdent} endTime={endTime} stage={stage} />
  }
}
