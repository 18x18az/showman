import { makeShortMatchName } from '@/utils/strings/match'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BlockInformationFragment, SittingInformationFragment, useConcludeBlockMutation, useGetTableOccupiedQuery, useGetUnqueuedSittingsQuery, useQueueSittingMutation, useStartNextBlockMutation } from '@/__generated__/graphql'
import { toast } from '@/primitives/toast/useToast'
import { Button } from '@/primitives/button/Button'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

interface QueueableField {
  id: number
  name: string
}

interface ActionMenuProps {
  queueableFields: QueueableField[]
  sittingId: number
}

function ActionMenu (props: ActionMenuProps): JSX.Element {
  const [queueSitting, { error }] = useQueueSittingMutation({
    refetchQueries: ['GetUnqueuedMatches', 'GetCompetitionFields']
  })
  if (props.queueableFields.length === 0) {
    return <div />
  }
  if (error !== undefined) {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>{error.message}</div>
      )
    })
  }
  const options = props.queueableFields.map((field) => {
    return (
      <DropdownMenuItem
        key={field.id} onClick={() => {
          console.log(`Queueing sitting ${props.sittingId} to field ${field.id}`)
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

function UnqueuedSitting (props: { sitting: SittingInformationFragment, fieldName?: string, queueableFields: QueueableField[] }): JSX.Element {
  const { sitting } = props
  const name = makeShortMatchName(sitting)
  const fieldName = props.fieldName ?? ''
  return (
    <div className='border border-slate-6 bg-slate-2 text-center rounded-md w-28 h-28 flex flex-col justify-between p-3'>
      <ActionMenu sittingId={sitting?.id} queueableFields={props.queueableFields} />
      <h1 className='text-slate-12'>{name}</h1>
      <h2 className='text-slate-11'>{fieldName}</h2>
    </div>
  )
}

function UnqueuedSittings (props: { block: BlockInformationFragment }): JSX.Element {
  const { data: tableData } = useGetTableOccupiedQuery({
    pollInterval: 500
  })

  if (tableData === undefined) {
    return <div />
  }

  const currentBlock = props.block
  const openFields = tableData.fields.filter((field) => { return field.competition?.onTableSitting === null })
  const openFieldInfo = openFields.map((field) => { return { id: field.id, name: field.name } })

  if (currentBlock === null) {
    return <div />
  }

  const sittings = currentBlock.unqueuedSittings.slice(0, 7)

  const matches = sittings.map((sitting) => {
    return <UnqueuedSitting fieldName={sitting.field?.name} key={sitting.id} sitting={sitting} queueableFields={openFieldInfo} />
  })

  return <div className='flex gap-8'>{matches}</div>
}

export function BottomPanel (): JSX.Element {
  const { data: blockData } = useGetUnqueuedSittingsQuery({
    pollInterval: 500
  })

  if (blockData === undefined) {
    return <>Loading...</>
  }

  const currentBlock = blockData.currentBlock

  if (currentBlock !== null) {
    if (currentBlock.canConclude) {
      return (
        <div>
          <ErrorableButton options={{ refetchQueries: ['GetUnqueuedMatches'] }} mutation={useConcludeBlockMutation}>End Block</ErrorableButton>
        </div>
      )
    }

    return <UnqueuedSittings block={currentBlock} />
  }

  const nextBlock = blockData.nextBlock

  if (nextBlock !== null) {
    const text = `Start ${nextBlock.name} Block`
    return (
      <div>
        <ErrorableButton size='lg' mutation={useStartNextBlockMutation}>{text}</ErrorableButton>
      </div>
    )
  }

  return <div />
}
