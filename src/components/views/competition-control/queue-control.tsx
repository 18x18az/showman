import { makeShortMatchName } from '@/utils/strings/match'
import { Button } from '@/components/ui/button'
import { PlayIcon, StopIcon, TrackNextIcon } from '@radix-ui/react-icons'
import { MatchStage, SittingInformationFragment, useClearLiveMutation, useOnDeckFieldQuery, usePutLiveMutation } from '../../../__generated__/graphql'

function SittingName (props: { title: string, sitting: SittingInformationFragment | null }): JSX.Element {
  let color = 'text-zinc-500'
  let name = '-'
  if (props.sitting !== null) {
    name = makeShortMatchName(props.sitting)
    color = 'text-zinc-400'
  }
  return (
    <>
      <h1 className='text-center text-2xl text-zinc-600 mb-2'>{props.title}</h1>
      <h2 className={`text-center text-4xl ${color}`}>{name}</h2>
    </>
  )
}

function ClearLiveButton (props: { hasOnDeck: boolean, canQueue: boolean }): JSX.Element {
  const disabled = !props.hasOnDeck || !props.canQueue
  const [clearLive] = useClearLiveMutation({})
  return (
    <Button variant='secondary' disabled={disabled} onClick={() => { void clearLive() }}>
      <StopIcon />
    </Button>
  )
}

function MakeLiveButton (props: { hasOnDeck: boolean, canQueue: boolean }): JSX.Element {
  const disabled = !props.hasOnDeck || !props.canQueue
  const [makeLive] = usePutLiveMutation({
    refetchQueries: ['LiveField', 'OnDeckField']
  })
  return (
    <Button variant='secondary' onClick={() => { void makeLive() }} disabled={disabled}>
      <PlayIcon />
    </Button>
  )
}

function ClearOrPushButton (props: { hasOnDeck: boolean, canQueue: boolean, activeStage: MatchStage }): JSX.Element {
  const hasActive = props.activeStage !== MatchStage.Empty
  return hasActive ? <ClearLiveButton hasOnDeck={props.hasOnDeck} canQueue={props.canQueue} /> : <MakeLiveButton canQueue={props.canQueue} hasOnDeck={props.hasOnDeck} />
}

function ForceButton (props: { activeStage: MatchStage, hasOnDeck: boolean }): JSX.Element {
  const disabled = !props.hasOnDeck || props.activeStage !== MatchStage.Scoring
  return (
    <Button variant='secondary' disabled={disabled} onClick={() => { }}>
      <TrackNextIcon />
    </Button>
  )
}

function QueueingContent (props: { activeStage: MatchStage, sitting: SittingInformationFragment | null }): JSX.Element {
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
  id: number
  competition: {
    stage: MatchStage
  } | null
}

interface OnDeckFieldInfo {
  id: number
  competition: {
    onFieldSitting: {
      id: number
    }
  }
}

function PopulatedQueueing (props: { info: OnDeckFieldInfo, active: LiveFieldInfo | null, sitting: SittingInformationFragment }): JSX.Element {
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
    return <PopulatedQueueing sitting={sitting} info={data.competitionInformation.onDeckField as OnDeckFieldInfo} active={data.competitionInformation.liveField} />
  }
}
