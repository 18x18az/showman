import { TextInput } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useDeleteFieldMutation, useSetFieldEnabledMutation, useSetFieldIsCompetitionMutation, useUpdateFieldNameMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Switch } from '@/primitives/switch/Switch'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'

interface Field {
  readonly id: number
  readonly name: string
  readonly isCompetition: boolean
  readonly isEnabled: boolean
}

export const Columns: Array<ColumnDef<Field>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const update = useErrorableMutation(useUpdateFieldNameMutation, { refetchQueries: ['Fields'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void update({ variables: { fieldId: row.original.id, name } }) }} />
      )
    }
  },
  {
    accessorKey: 'isEnabled',
    header: 'Enabled',
    cell: ({ row }) => {
      const setEnabled = useErrorableMutation(useSetFieldEnabledMutation, { refetchQueries: ['Fields'] })
      return (
        <div>
          <Switch checked={row.original.isEnabled} onCheckedChange={(checked: boolean) => { void setEnabled({ variables: { isEnabled: checked, fieldId: row.original.id } }) }} />
        </div>
      )
    }
  },
  {
    accessorKey: 'isCompetition',
    header: 'Competition',
    cell: ({ row }) => {
      const setIsCompetition = useErrorableMutation(useSetFieldIsCompetitionMutation, { refetchQueries: ['Fields'] })
      return (
        <div>
          <Switch checked={row.original.isCompetition} onCheckedChange={(checked: boolean) => { void setIsCompetition({ variables: { isCompetition: checked, fieldId: row.original.id } }) }} />
        </div>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ErrorableButton tooltip='Delete Field' variant='ghost' mutation={useDeleteFieldMutation} options={{ variables: { fieldId: row.original.id }, refetchQueries: ['Fields'] }}><Trash2 /></ErrorableButton>
    }
  }
]
