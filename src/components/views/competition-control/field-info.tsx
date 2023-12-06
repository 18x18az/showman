import { CompetitionFieldStatusSubscription, Field, FieldsSubscription, LiveFieldSubscription, MATCH_STAGE, OnDeckFieldSubscription } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { makeShortMatchName } from '@/utils/strings/match'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { putFieldOnDeck, replayMatch } from '@/contracts/match-control'

function FieldActionMenu (props: { field: Field, match: Match, stage: MATCH_STAGE }): JSX.Element {
  const liveField = LiveFieldSubscription()
  const onDeckField = OnDeckFieldSubscription()

  const thisField = props.field.id

  const stage = props.stage

  if (liveField === undefined || onDeckField === undefined) {
    return <></>
  }

  const options: JSX.Element[] = []

  if (liveField !== thisField && onDeckField !== thisField && stage === MATCH_STAGE.QUEUED) {
    options.push(
      <DropdownMenuItem key='queue' onClick={() => { void putFieldOnDeck(props.field.id) }}>
        Queue
      </DropdownMenuItem>
    )
  }

  if (stage === MATCH_STAGE.SCORING || stage === MATCH_STAGE.OUTRO) {
    options.push(
      <DropdownMenuItem key='replay' onClick={() => { void replayMatch(props.match.id) }}>
        Replay
      </DropdownMenuItem>
    )
  }

  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={options.length === 0}>
          <button className='flex h-8 w-8 p-2 data-[state=open]:bg-muted'><DotsHorizontalIcon /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
function OnField (props: { field: Field, match: Match | null, stage: MATCH_STAGE }): JSX.Element {
  const match = props.match

  let content = <></>

  if (match === null) {
    content = (
      <div className='text-4xl h-full text-center text-zinc-800 mt-28'>
        Empty
      </div>
    )
  } else {
    const name = makeShortMatchName(match)
    content = (
      <div className='flex flex-col justify-between h-full'>
        <FieldActionMenu field={props.field} match={match} stage={props.stage} />
        <h1 className='text-4xl text-center text-zinc-500 mb-8'>{name}</h1>
        <div />
      </div>
    )
  }

  return (
    <div className='h-72 w-72 border border-zinc-800 rounded-lg flex flex-col justify-evenly'>
      {content}
    </div>
  )
}

function OnDeck (props: { field: Field, match: Match | null }): JSX.Element {
  const match = props.match

  let content = <></>

  if (match === null) {
    content = (
      <div className='text-4xl h-full text-center text-zinc-800 mt-28'>
        Empty
      </div>
    )
  }

  return (
    <div className='h-72 w-72 border border-zinc-800 rounded-lg'>
      {content}
    </div>
  )
}
function FieldInfo (props: { field: Field }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.field.id)

  if (status === undefined) {
    return <>Loading...</>
  }

  return (
    <div className='flex flex-col gap-8 w-96 mb-8'>
      <h1 className='text-center text-2xl font-sans text-zinc-500'>{status.field.name}</h1>
      <OnField field={props.field} match={status.onField} stage={status.stage} />
      <OnDeck field={props.field} match={status.onDeck} />
    </div>
  )
}
export function FieldInfos (): JSX.Element {
  const fields = FieldsSubscription()

  if (fields === undefined) {
    return <>Loading</>
  }

  const competitionFields = fields.filter((field) => field.isCompetition)

  const fieldControls = competitionFields.map((field) => {
    return (
      <FieldInfo field={field} key={field.id} />
    )
  })

  return (
    <div className='flex justify-evenly flex-1'>{fieldControls}</div>
  )
}
