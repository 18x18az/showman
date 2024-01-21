import { DropdownMenuItem } from '../../../ui/dropdown-menu'
import { toast } from '../../../ui/use-toast'
import { usePutOnDeckMutation, useUnqueueSittingMutation } from '../../../../__generated__/graphql'

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
  const [putOnDeck, { error }] = usePutOnDeckMutation({
    refetchQueries: ['OnDeckField']
  })

  if (error !== undefined) {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>{error.message}</div>
      )
    })
  }

  return (
    <BaseAction
      text='Queue' action={async () => {
        void putOnDeck({ variables: { fieldId: props.fieldId } })
      }}
    />
  )
}

export function RemoveAction (props: { sittingId: number }): JSX.Element {
  const [unqueue, { error }] = useUnqueueSittingMutation({
    refetchQueries: ['GetCompetitionFields']
  })

  if (error !== undefined) {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>{error.message}</div>
      )
    })
  }

  return (
    <BaseAction
      text='Remove' action={async () => {
        void unqueue({ variables: { sittingId: props.sittingId } })
      }}
    />
  )
}
