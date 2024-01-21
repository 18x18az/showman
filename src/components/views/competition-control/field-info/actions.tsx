import { useMutation } from '@apollo/client'
import { DropdownMenuItem } from '../../../ui/dropdown-menu'
import { gql } from '../../../../__generated__'
import { toast } from '../../../ui/use-toast'

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

const PUT_ON_DECK = gql(`
  mutation PutOnDeck($fieldId: Int!) {
    putOnDeck(fieldId: $fieldId) {
      onDeckField {
        id
      }
    }
  }
`)

export function PutOnDeckAction (props: { fieldId: number }): JSX.Element {
  const [putOnDeck, { error }] = useMutation(PUT_ON_DECK, {
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

const UNQUEUE_SITTING = gql(`
  mutation UnqueueSitting($sittingId: Int!) {
    unqueue(sittingId: $sittingId) {
      onFieldSitting {
        id
      }
      onTableSitting {
        id
      }
    }
  }
`)

export function RemoveAction (props: { sittingId: number }): JSX.Element {
  const [unqueue, { error }] = useMutation(UNQUEUE_SITTING, {
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
