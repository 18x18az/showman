import { makeShortMatchName } from '@/utils/strings/match'
import { PlayIcon, ReloadIcon, ResetIcon, StopIcon } from '@radix-ui/react-icons'
import { useOffsetTimer } from '@/app/display/field/[uuid]/timer'
import { MatchStage, SittingInformationFragment, useFieldControlSubscription, useLiveFieldQuery, useReplayMatchMutation, useResetAutonMutation, useStartFieldMutation, useStopFieldMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

function makeTime (offset: number, truncate = false): string {
  if (truncate && offset < 0) {
    return '0:00'
  }

  const time = Math.ceil(offset / 1000)
  const minutes = Math.floor(time / 60).toString()
  const seconds = (time % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

function StartButton (props: { disabled: boolean, fieldId: number }): JSX.Element {
  return (
    <ErrorableButton
      tooltip='Start Match'
      disabled={props.disabled} mutation={useStartFieldMutation} options={{ variables: { fieldId: props.fieldId } }}
    ><PlayIcon />
    </ErrorableButton>
  )
}

function StopButton (props: { fieldId: number }): JSX.Element {
  return (
    <ErrorableButton
      tooltip='End Match'
      mutation={useStopFieldMutation} options={{ variables: { fieldId: props.fieldId } }}
    ><StopIcon />
    </ErrorableButton>
  )
}

function ResetButton (props: { disabled: boolean, fieldId: number }): JSX.Element {
  return (
    <ErrorableButton
      tooltip='Reset Auton'
      disabled={props.disabled} mutation={useResetAutonMutation} options={{ variables: { fieldId: props.fieldId } }}
    ><ResetIcon />
    </ErrorableButton>
  )
}

function ReplayButton (props: { disabled: boolean, sittingId: number }): JSX.Element {
  return (
    <ErrorableButton
      tooltip='Replay Match'
      disabled={props.disabled} mutation={useReplayMatchMutation} options={{ variables: { sittingId: props.sittingId } }}
    ><ReloadIcon />
    </ErrorableButton>
  )
}

function MatchControlContent (props: { sitting: SittingInformationFragment | null, stage: MatchStage, endTime: string | null, fieldId: number }): JSX.Element {
  const { sitting, stage, endTime, fieldId } = props
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
    const offset = useOffsetTimer(endTime)
    timeText = <>{makeTime(offset)}</>
  }

  let startStopButton = <StartButton disabled={!canStart} fieldId={fieldId} />
  if (canEnd) {
    startStopButton = <StopButton fieldId={fieldId} />
  }

  const sittingId = sitting?.id ?? 0

  return (
    <div>
      <h1 className='text-center text-2xl text-slate-12 mb-3'>Match</h1>
      <h2 className='text-center text-4xl text-iris-11 mb-4'>{sittingName}</h2>
      <h2 className='text-center text-3xl font-mono text-iris-11 mb-4'>{timeText}</h2>
      <div className='flex justify-evenly gap-4'>
        <ResetButton disabled={!canReset} fieldId={props.fieldId} />
        {startStopButton}
        <ReplayButton disabled={!canReplay} sittingId={sittingId} />
      </div>
    </div>
  )
}

function EmptyMatchControl (): JSX.Element {
  return <MatchControlContent sitting={null} stage={MatchStage.Empty} endTime={null} fieldId={0} />
}

function PopulatedMatchControl (props: { fieldId: number, sitting: SittingInformationFragment, stage: MatchStage, endTime: string | null }): JSX.Element {
  useFieldControlSubscription({
    variables: {
      fieldId: props.fieldId
    }
  })
  return <MatchControlContent sitting={props.sitting} stage={props.stage} endTime={props.endTime} fieldId={props.fieldId} />
}

export function MatchControl (): JSX.Element {
  const { data } = useLiveFieldQuery()
  const field = data?.competitionInformation?.liveField
  const competition = field?.competition
  const sitting = competition?.onFieldSitting
  if (field === null || field === undefined || competition === null || competition === undefined || sitting === null || sitting === undefined) {
    return <EmptyMatchControl />
  } else {
    const endTime = data?.competitionInformation?.liveField?.fieldControl?.endTime
    const stage = competition.stage
    return <PopulatedMatchControl fieldId={field.id} sitting={sitting} endTime={endTime} stage={stage} />
  }
}
