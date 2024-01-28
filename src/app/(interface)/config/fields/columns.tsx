import { TextInput } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useDeleteFieldMutation, useUpdateFieldNameMutation } from '../../../../__generated__/graphql'
import ErrorableButton from '../../../../components/errorable-button/ErrorableButton'

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
      const [update] = useUpdateFieldNameMutation({ refetchQueries: ['Fields'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void update({ variables: { fieldId: row.original.id, name } }) }} />
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
      return <ErrorableButton variant='ghost' mutation={useDeleteFieldMutation} options={{ variables: { fieldId: row.original.id }, refetchQueries: ['Fields'] }}><Trash2 /></ErrorableButton>
    }
  }
]
