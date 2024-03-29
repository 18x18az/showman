
import { toast } from '@/primitives/toast/useToast'
import { usePutOnDeckMutation, useReplayMatchMutation, useUnqueueSittingMutation } from '@/__generated__/graphql'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface BaseActionProps {
  readonly text: string
  readonly action: () => Promise<void>
}

function BaseAction (props: BaseActionProps): JSX.Element {
  const handleAction = (): void => { void props.action() }
  return (
    <DropdownMenuItem onClick={handleAction}>
      {props.text}
    </DropdownMenuItem>
  )
}

export function ReplayAction (props: { readonly sittingId: number }): JSX.Element {
  const [replay] = useReplayMatchMutation({ variables: { sittingId: props.sittingId } })
  return <BaseAction text='Replay' action={async () => { void replay() }} />
}

export function PutOnDeckAction (props: { readonly fieldId: number }): JSX.Element {
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

export function RemoveAction (props: { readonly sittingId: number }): JSX.Element {
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
