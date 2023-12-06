import { makeShortMatchName } from '@/utils/strings/match'
import { Button } from '@/components/ui/button'
import { PlayIcon, StopIcon, TrackNextIcon } from '@radix-ui/react-icons'
import { Match } from '@/contracts/match'
import { CompetitionFieldStatusSubscription, LiveFieldSubscription, OnDeckFieldSubscription } from '@/contracts/fields'
import { clearLive, pushLive } from '@/contracts/match-control'

function MatchName (props: { title: string, match: Match | null }): JSX.Element {
  let color = 'text-zinc-500'
  let name = '-'
  if (props.match !== null) {
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

function ClearLiveButton (props: { match: Match | null }): JSX.Element {
  return (
    <Button variant='secondary' disabled={props.match === null} onClick={() => { void clearLive() }}>
      <StopIcon />
    </Button>
  )
}

function MakeLiveButton (props: { match: Match | null }): JSX.Element {
  return (
    <Button variant='secondary' onClick={() => { void pushLive() }} disabled={props.match === null}>
      <PlayIcon />
    </Button>
  )
}

function ClearOrPushButton (props: { match: Match | null, hasActive: boolean }): JSX.Element {
  return props.hasActive ? <ClearLiveButton match={props.match} /> : <MakeLiveButton match={props.match} />
}

function ForceButton (props: { match: Match | null, hasActive: boolean }): JSX.Element {
  return (
    <Button variant='secondary' disabled={!props.hasActive || props.match === null} onClick={() => { void pushLive() }}>
      <TrackNextIcon />
    </Button>
  )
}

function QueueingContent (props: { match: Match | null, hasActive: boolean }): JSX.Element {
  return (
    <>
      <MatchName title='On Deck' match={props.match} />
      <div className='flex justify-evenly gap-4 mt-6'>
        <ClearOrPushButton match={props.match} hasActive={props.hasActive} />
        <ForceButton match={props.match} hasActive={props.hasActive} />
      </div>
    </>
  )
}

function EmptyQueueing (): JSX.Element {
  return <QueueingContent match={null} hasActive={false} />
}

function PopulatedQueueing (props: { fieldId: number, hasActive: boolean }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.fieldId) ?? { onField: null }

  let match: Match | null = null
  if (status.onField !== null) {
    match = status.onField
  }

  return <QueueingContent match={match} hasActive={props.hasActive} />
}
export function Queueing (): JSX.Element {
  const onDeckField = OnDeckFieldSubscription()
  const liveField = LiveFieldSubscription()

  const hasActive = liveField !== null

  if (onDeckField === null || onDeckField === undefined) {
    return <EmptyQueueing />
  } else {
    return <PopulatedQueueing fieldId={onDeckField} hasActive={hasActive} />
  }
}
