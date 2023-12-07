import { Match } from '@/contracts/match'
import { putFieldOnDeck, removeMatch, replayMatch } from '@/contracts/match-control'
import { DropdownMenuItem } from '../../../ui/dropdown-menu'
import { Field } from '@/contracts/fields'

function BaseAction (props: { text: string, action: () => Promise<void> }): JSX.Element {
  const handleAction = (): void => { void props.action() }
  return (
    <DropdownMenuItem onClick={handleAction}>
      {props.text}
    </DropdownMenuItem>
  )
}
export function ReplayAction (props: { match: Match }): JSX.Element {
  return <BaseAction text='Replay' action={async () => { await replayMatch(props.match.id) }} />
}

export function PutOnDeckAction (props: { field: Field }): JSX.Element {
  return <BaseAction text='Queue' action={async () => { await putFieldOnDeck(props.field.id) }} />
}

export function RemoveAction (props: { match: Match }): JSX.Element {
  return <BaseAction text='Remove' action={async () => { await removeMatch(props.match.id) }} />
}
