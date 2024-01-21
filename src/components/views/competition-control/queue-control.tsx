import { makeShortMatchName } from '@/utils/strings/match'
import { Button } from '@/components/ui/button'
import { PlayIcon, StopIcon, TrackNextIcon } from '@radix-ui/react-icons'

function MatchName (props: { title: string, match: Match | null }): JSX.Element {
  let color = 'text-zinc-500'
  let name = '-'
  if (props.match !== null && props.match.status === MatchStatus.QUEUED) {
    name = makeShortMatchName(props.match)
    color = 'text-zinc-400'
  }
  return (
    <>
      <h1 className='text-center text-2xl text-zinc-600 mb-2'>{props.title}</h1>
      <h2 className={`text-center text-4xl ${color}`}>{name}</h2>
    </>
  )
}

function ClearLiveButton (props: { match: Match | null, canQueue: boolean }): JSX.Element {
  const disabled = props.match === null || !props.canQueue
  return (
    <Button variant='secondary' disabled={disabled} onClick={() => { void clearLive() }}>
      <StopIcon />
    </Button>
  )
}

function MakeLiveButton (props: { match: Match | null }): JSX.Element {
  return (
    <Button variant='secondary' onClick={() => { void pushLive() }} disabled={props.match === null || props.match.status === MatchStatus.SCORING}>
      <PlayIcon />
    </Button>
  )
}

function ClearOrPushButton (props: { match: Match | null, hasActive: boolean, canQueue: boolean }): JSX.Element {
  return props.hasActive ? <ClearLiveButton match={props.match} canQueue={props.canQueue} /> : <MakeLiveButton match={props.match} />
}

function ForceButton (props: { match: Match | null, hasActive: boolean, canQueue: boolean }): JSX.Element {
  const disabled = !props.canQueue || !props.hasActive || props.match === null || props.match.status === MatchStatus.SCORING
  return (
    <Button variant='secondary' disabled={disabled} onClick={() => { void pushLive() }}>
      <TrackNextIcon />
    </Button>
  )
}

function QueueingContent (props: { match: Match | null, hasActive: boolean, stage: MATCH_STAGE }): JSX.Element {
  const canQueue = (props.stage === MATCH_STAGE.ON_DECK || props.stage === MATCH_STAGE.QUEUED || props.stage === MATCH_STAGE.OUTRO)
  return (
    <>
      <MatchName title='On Deck' match={props.match} />
      <div className='flex justify-evenly gap-4 mt-6'>
        <ClearOrPushButton match={props.match} hasActive={props.hasActive} canQueue={canQueue} />
        <ForceButton match={props.match} hasActive={props.hasActive} canQueue={canQueue} />
      </div>
    </>
  )
}

function EmptyQueueing (): JSX.Element {
  return <QueueingContent match={null} hasActive={false} stage={MATCH_STAGE.EMPTY} />
}

function PopulatedQueueing (props: { fieldId: number, active: SelectedField }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.fieldId) ?? { onField: null }
  const liveStatus = CompetitionFieldStatusSubscription(props.active ?? 0)

  let stage = MATCH_STAGE.EMPTY
  if (liveStatus !== undefined) {
    stage = liveStatus.stage
  }

  let match: Match | null = null
  if (status.onField !== null) {
    match = status.onField
  }

  return <QueueingContent match={match} hasActive={props.active !== undefined && props.active !== null} stage={stage} />
}
export function Queueing (): JSX.Element {
  const onDeckField = OnDeckFieldSubscription()
  const liveField = LiveFieldSubscription()

  if (onDeckField === null || onDeckField === undefined) {
    return <EmptyQueueing />
  } else {
    return <PopulatedQueueing fieldId={onDeckField} active={liveField} />
  }
}
