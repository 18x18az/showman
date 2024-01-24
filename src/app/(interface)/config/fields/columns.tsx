import { TextInput } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../../../components/ui/button'
import { Trash2 } from 'lucide-react'
import { useDeleteFieldMutation } from '../../../../__generated__/graphql'

async function updateName (fieldId: number, name: string): Promise<void> {
  // const url = `field/${fieldId}/name`
}

async function removeField (fieldId: number): Promise<void> {
  await remove({ variables: { fieldId }, refetchQueries: ['Fields'] })
}

interface Field {
  id: number
  name: string
  isCompetition: boolean
  isEnabled: boolean
}

export const Columns: Array<ColumnDef<Field>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.id, name) }} />
      )
    }
  },
  {
    accessorKey: 'isEnabled',
    header: 'Enabled',
    cell: ({ row }) => <>{row.original.isEnabled ? 'True' : 'False'}</>
  },
  {
    accessorKey: 'isCompetition',
    header: 'Competition',
    cell: ({ row }) => <>{row.original.isCompetition ? 'True' : 'False'}</>
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [remove] = useDeleteFieldMutation({ variables: { fieldId: row.original.id }, refetchQueries: ['Fields'] })
      return (
        <Button onClick={() => { void remove() }} variant='ghost'><Trash2 /></Button>
      )
    }
  }
]
