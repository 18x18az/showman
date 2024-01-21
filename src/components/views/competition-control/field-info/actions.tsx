import { DropdownMenuItem } from '../../../ui/dropdown-menu'

function BaseAction (props: { text: string, action: () => Promise<void> }): JSX.Element {
  const handleAction = (): void => { void props.action() }
  return (
    <DropdownMenuItem onClick={handleAction}>
      {props.text}
    </DropdownMenuItem>
  )
}
export function ReplayAction (props: { sittingId: number }): JSX.Element {
  return <BaseAction text='Replay' action={async () => { }} />
}

export function PutOnDeckAction (props: { fieldId: number }): JSX.Element {
  return <BaseAction text='Queue' action={async () => { }} />
}

export function RemoveAction (props: { sittingId: number }): JSX.Element {
  return <BaseAction text='Remove' action={async () => {}} />
}
