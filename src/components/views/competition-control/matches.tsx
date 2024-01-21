import { makeShortMatchName } from '@/utils/strings/match'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { gql } from '../../../__generated__'
import { useMutation, useQuery } from '@apollo/client'
import { Round } from '../../../__generated__/graphql'

interface QueueableField {
  id: number
  name: string
}

interface ActionMenuProps {
  queueableFields: QueueableField[]
  sittingId: number
}

const QUEUE_SITTING = gql(`
  mutation QueueSitting($sittingId: Int!, $fieldId: Int!) {
    queueSitting(sittingId: $sittingId, fieldId: $fieldId) {
      id
    }
  }
`)

function ActionMenu (props: ActionMenuProps): JSX.Element {
  const [queueSitting] = useMutation(QUEUE_SITTING)
  if (props.queueableFields.length === 0) {
    return <div />
  }
  const options = props.queueableFields.map((field) => {
    return (
      <DropdownMenuItem
        key={field.id} onClick={() => {
          void queueSitting({ variables: { sittingId: props.sittingId, fieldId: field.id } })
        }}
      >
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

interface SittingContest {
  round: Round
  number: number
}

interface UnqueuedSittingProps {
  id: number
  contest: SittingContest
  match: {
    number: number
  }
  field: {
    name: string
  } | null
}

function UnqueuedSitting (props: { sitting: UnqueuedSittingProps, queueableFields: QueueableField[] }): JSX.Element {
  const { sitting } = props
  const name = makeShortMatchName({ round: sitting.contest.round, contest: sitting.contest.number, match: sitting.match.number })
  const fieldName = sitting.field?.name ?? ''
  return (
    <div className='border border-zinc-800 text-center rounded-md w-28 h-28 flex flex-col justify-between p-3'>
      <ActionMenu sittingId={sitting.id} queueableFields={props.queueableFields} />
      <h1>{name}</h1>
      <h2>{fieldName}</h2>
    </div>
  )
}

// function ProceedButton (): JSX.Element {
//   if (block === undefined || skillsEnabled === undefined) return <></>
//   const hasBlock = block !== null

//   const text = hasBlock ? 'End Block' : 'Proceed'

//   return (
//     <div>
//       <Button disabled={skillsEnabled} onClick={() => { void nextBlock() }}>{text}</Button>
//     </div>
//   )
// }

const GET_UNQUEUED_MATCHES = gql(`
  query GetUnqueuedMatches {
    currentBlock {
      name
      unqueuedSittings {
        id
        contest {
          round
          number
        }
        field {
          id
          name
        }
        match {
          number
        }
      }
    }
  }
`)

const GET_TABLE_OCCUPIED = gql(`
  query GetTableOccupied {
    fields(isEnabled: true, isCompetition: true) {
      id
      name
      competition {
        onTableSitting {
          id
        }
      }
    }
  }
`)

export function UnqueuedMatches (): JSX.Element {
  const { data: blockData } = useQuery(
    GET_UNQUEUED_MATCHES,
    {
      pollInterval: 500
    }
  )

  const { data: tableData } = useQuery(
    GET_TABLE_OCCUPIED,
    {
      pollInterval: 500
    }
  )

  if (blockData === undefined || tableData === undefined) {
    return <>Loading...</>
  }

  const currentBlock = blockData.currentBlock

  const openFields = tableData.fields.filter((field) => { return field.competition?.onTableSitting === null })
  const openFieldInfo = openFields.map((field) => { return { id: field.id, name: field.name } })

  if (currentBlock === null) {
    return <div />
  }

  const sittings = currentBlock.unqueuedSittings.slice(0, 7)

  const matches = sittings.map((sitting) => {
    return <UnqueuedSitting key={sitting.id} sitting={sitting} queueableFields={openFieldInfo} />
  })

  return <div className='flex gap-8'>{matches}</div>
}
