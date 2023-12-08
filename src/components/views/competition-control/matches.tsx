import { makeShortMatchName } from '@/utils/strings/match'
import { Field, FieldsSubscription, QueueableFieldsSubscription, VacantFieldsSubscription } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BlockSubscription, UnqueuedMatchesSubscription, nextBlock } from '@/contracts/matches'
import { SkillsEnabledSubscription, queueMatch } from '@/contracts/match-control'

interface ActionMenuProps {
  queueableFields: Field[]
  match: Match
}
function ActionMenu (props: ActionMenuProps): JSX.Element {
  if (props.queueableFields.length === 0) {
    return <div />
  }
  const options = props.queueableFields.map((field) => {
    return (
      <DropdownMenuItem key={field.id} onClick={() => { void queueMatch(field.id, props.match.id) }}>
        {field.name}
      </DropdownMenuItem>
    )
  })

  return (
    <div className='flex justify-evenly'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'><DotsHorizontalIcon /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function UnqueuedMatch (props: { match: Match, queueableFields: Field[] }): JSX.Element {
  const name = makeShortMatchName(props.match)
  const fieldName = props.match.fieldName ?? ''
  return (
    <div className='border border-zinc-800 text-center rounded-md w-28 h-28 flex flex-col justify-between p-3'>
      <ActionMenu match={props.match} queueableFields={props.queueableFields} />
      <h1>{name}</h1>
      <h2>{fieldName}</h2>
    </div>
  )
}

function ProceedButton (): JSX.Element {
  const block = BlockSubscription()
  const skillsEnabled = SkillsEnabledSubscription()

  if (block === undefined || skillsEnabled === undefined) return <></>
  const hasBlock = block !== null

  const text = hasBlock ? 'End Block' : 'Proceed'

  return (
    <div>
      <Button disabled={skillsEnabled} onClick={() => { void nextBlock() }}>{text}</Button>
    </div>
  )
}
export function UnqueuedMatches (): JSX.Element {
  const unqueued = UnqueuedMatchesSubscription()
  const queueableFields = QueueableFieldsSubscription()?.sort((a, b) => { return a.id - b.id })
  const vacantFields = VacantFieldsSubscription()
  const fields = FieldsSubscription()

  if (unqueued === undefined || queueableFields === undefined || vacantFields === undefined || fields === undefined) {
    return <>Loading...</>
  }

  const toDisplay = unqueued.slice(0, 7)

  if (toDisplay.length === 0 && vacantFields.length === fields.length) {
    return <ProceedButton />
  }

  const matches = toDisplay.map((match) => {
    return <UnqueuedMatch key={match.id} match={match} queueableFields={queueableFields} />
  })

  return <div className='flex gap-8'>{matches}</div>
}
