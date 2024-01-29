import { makeShortMatchName } from '@/utils/strings/match'
import { PlayIcon, StopIcon, TrackNextIcon } from '@radix-ui/react-icons'
import { MatchStage, SittingInformationFragment, useClearLiveMutation, useOnDeckFieldQuery, usePutLiveMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Button } from '@/primitives/button/Button'

interface SittingNameProps {
  readonly title: string
  readonly sitting: SittingInformationFragment | null
}

function SittingName (props: SittingNameProps): JSX.Element {
  let color = 'text-slate-11'
  let name = '-'
  if (props.sitting !== null) {
    name = makeShortMatchName(props.sitting)
    color = 'text-gold-11'
  }
  return (
    <>
      <h1 className='text-center text-2xl text-slate-11 mb-2'>{props.title}</h1>
      <h2 className={`text-center text-4xl ${color}`}>{name}</h2>
    </>
  )
}

interface ClearLiveButtonProps {
  readonly hasOnDeck: boolean
  readonly canQueue: boolean
}

function ClearLiveButton (props: ClearLiveButtonProps): JSX.Element {
  const disabled = !props.hasOnDeck || !props.canQueue
  return (
    <ErrorableButton tooltip='Clear Live Field' mutation={useClearLiveMutation} options={{ refetchQueries: ['LiveField', 'OnDeckField'] }} disabled={disabled}>
      <StopIcon />
    </ErrorableButton>
  )
}

interface MakeLiveButtonProps {
  readonly hasOnDeck: boolean
  readonly canQueue: boolean
}

function MakeLiveButton (props: MakeLiveButtonProps): JSX.Element {
  const disabled = !props.hasOnDeck || !props.canQueue
  return (
    <ErrorableButton tooltip='Push Live Field' mutation={usePutLiveMutation} options={{ refetchQueries: ['LiveField', 'OnDeckField'] }} disabled={disabled}>
      <PlayIcon />
    </ErrorableButton>
  )
}

interface ClearOrPushButtonProps {
  readonly hasOnDeck: boolean
  readonly canQueue: boolean
  readonly activeStage: MatchStage
}

function ClearOrPushButton (props: ClearOrPushButtonProps): JSX.Element {
  const hasActive = props.activeStage !== MatchStage.Empty
  return hasActive ? <ClearLiveButton hasOnDeck={props.hasOnDeck} canQueue={props.canQueue} /> : <MakeLiveButton canQueue={props.canQueue} hasOnDeck={props.hasOnDeck} />
}

interface ForceButtonProps {
  readonly hasOnDeck: boolean
  readonly activeStage: MatchStage
}

function ForceButton (props: ForceButtonProps): JSX.Element {
  const disabled = !props.hasOnDeck || props.activeStage !== MatchStage.Scoring
  return (
    <Button disabled={disabled} onClick={() => { }}>
      <TrackNextIcon />
    </Button>
  )
}

interface QueueingContentProps {
  readonly activeStage: MatchStage
  readonly sitting: SittingInformationFragment | null
}

function QueueingContent (props: QueueingContentProps): JSX.Element {
  const canQueue = (props.activeStage === MatchStage.Queued || props.activeStage === MatchStage.Scoring || props.activeStage === MatchStage.Empty)
  const hasOnDeck = props.sitting !== null
  return (
    <>
      <SittingName title='On Deck' sitting={props.sitting} />
      <div className='flex justify-evenly gap-4 mt-6'>
        <ClearOrPushButton activeStage={props.activeStage} hasOnDeck={hasOnDeck} canQueue={canQueue} />
        <ForceButton activeStage={props.activeStage} hasOnDeck={hasOnDeck} />
      </div>
    </>
  )
}

function EmptyQueueing (): JSX.Element {
  return <QueueingContent activeStage={MatchStage.Empty} sitting={null} />
}

interface LiveFieldInfo {
  readonly id: number
  readonly competition: {
    readonly stage: MatchStage
  } | null
}

interface PopulatedQueueingProps {
  readonly active: LiveFieldInfo | null
  readonly sitting: SittingInformationFragment
}

function PopulatedQueueing (props: PopulatedQueueingProps): JSX.Element {
  let stage = MatchStage.Empty
  const { active } = props

  if (active?.competition?.stage !== undefined) {
    stage = active.competition.stage
  }

  return <QueueingContent sitting={props.sitting} activeStage={stage} />
}

export function Queueing (): JSX.Element {
  const { data } = useOnDeckFieldQuery({ pollInterval: 500 })
  if (data?.competitionInformation.onDeckField?.competition?.onFieldSitting?.id === undefined) {
    return <EmptyQueueing />
  } else {
    const sitting = data.competitionInformation.onDeckField.competition.onFieldSitting
    return <PopulatedQueueing sitting={sitting} active={data.competitionInformation.liveField} />
  }
}
