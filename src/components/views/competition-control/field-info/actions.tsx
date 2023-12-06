import { Match } from '@/contracts/match'
import { putFieldOnDeck, removeMatch, replayMatch } from '@/contracts/match-control'
import { DropdownMenuItem } from '../../../ui/dropdown-menu'
import { Field } from '@/contracts/fields'

function BaseAction (props: { text: string, key: string, action: () => Promise<void> }): JSX.Element {
  const handleAction = (): void => { void props.action() }
  return (
    <DropdownMenuItem key={props.key} onClick={handleAction}>
      {props.text}
    </DropdownMenuItem>
  )
}
export function ReplayAction (props: { match: Match }): JSX.Element {
  return <BaseAction key='replay' text='Replay' action={async () => { await replayMatch(props.match.id) }} />
}

export function PutOnDeckAction (props: { field: Field }): JSX.Element {
  return <BaseAction key='queue' text='Queue' action={async () => { await putFieldOnDeck(props.field.id) }} />
}

export function RemoveAction (props: { match: Match }): JSX.Element {
  return <BaseAction key='remove' text='Remove' action={async () => { await removeMatch(props.match.id) }} />
}
