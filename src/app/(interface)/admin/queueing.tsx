import { makeShortMatchName } from '@/utils/strings/match'
import { FieldStatus } from '../interfaces'
import { Button } from '@/components/ui/button'
import { PlayIcon, StopIcon, TrackNextIcon } from '@radix-ui/react-icons'
import { EmptyPost, JsonTopic } from '@/utils/maestro'
import { Match } from '../../../contracts/match'
import { CompetitionFieldStatus } from '../../../contracts/fields'

interface QueueingProps {
  // active: FieldStatus | null
  // next: FieldStatus | null
}

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

function QueueingContent (props: {match: Match | null, hasActive: boolean}): JSX.Element {
  const makeActive = async () => {
    await EmptyPost('competitionControl/pushActive')
  }

  const clearActive = async () => {
    await EmptyPost('fieldControl/clearActive')
  }

  const firstButton = props.hasActive ? <Button variant='secondary' disabled={props.match === null} onClick={() => { void clearActive() }}><StopIcon /></Button> : <Button variant='secondary' onClick={() => { void makeActive() }} disabled={props.match === null}><PlayIcon /></Button>

  return (
    <>
      <MatchName title='On Deck' match={props.match} />
      <div className='flex justify-evenly gap-4 mt-6'>
        {firstButton}
        <Button variant='secondary' disabled={!props.hasActive || props.match === null} onClick={() => { void makeActive() }}><TrackNextIcon /></Button>
      </div>
    </>
  )
}

function EmptyQueueing (): JSX.Element {
  return <QueueingContent match={null} hasActive={false} />
}

function PopulatedQueueing (props: {fieldId: number, hasActive: boolean}): JSX.Element {
  const status = JsonTopic<CompetitionFieldStatus>(`competitionField/${props.fieldId}`)

  let match: Match | null = null
  if (status !== undefined && status.onField !== null) {
    match = status.onField
  }

  return <QueueingContent match={match} hasActive={props.hasActive} />
}
export function Queueing (): JSX.Element {
  const onDeckField = JsonTopic<{fieldId: number | null}>('onDeckField')
  const activeField = JsonTopic<{fieldId: number | null}>('activeField')

  const hasActive = activeField !== undefined && activeField.fieldId !== null

  if(onDeckField === undefined || onDeckField.fieldId === null) {
    return <EmptyQueueing />
  } else {
    return <PopulatedQueueing fieldId={onDeckField.fieldId} hasActive={hasActive} />
  }
}
