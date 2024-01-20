import { makeShortMatchName } from '@/utils/strings/match'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BlockSubscription, nextBlock } from '@/contracts/matches'
import { SkillsEnabledSubscription, queueMatch } from '@/contracts/match-control'
import { gql } from '../../../__generated__'
import { useQuery } from '@apollo/client'
import { Round } from '../../../__generated__/graphql'

interface QueueableField {
  id: number
  name: string
}

interface ActionMenuProps {
  queueableFields: QueueableField[]
  sittingId: number
}
function ActionMenu (props: ActionMenuProps): JSX.Element {
  if (props.queueableFields.length === 0) {
    return <div />
  }
  const options = props.queueableFields.map((field) => {
    return (
      <DropdownMenuItem key={field.id} onClick={() => { void queueMatch(field.id, props.sittingId) }}>
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
          name
        }
        match {
          number
        }
      }
    }
  }
`)

export function UnqueuedMatches (): JSX.Element {
  const { data } = useQuery(
    GET_UNQUEUED_MATCHES,
    {
      pollInterval: 500
    }
  )

  if (data === undefined) {
    return <>Loading...</>
  }

  const currentBlock = data.currentBlock

  if (currentBlock === null) {
    return <ProceedButton />
  }

  const sittings = currentBlock.unqueuedSittings.slice(0, 7)

  const matches = sittings.map((sitting) => {
    return <UnqueuedSitting key={sitting.id} sitting={sitting} queueableFields={[]} />
  })

  return <div className='flex gap-8'>{matches}</div>
}
