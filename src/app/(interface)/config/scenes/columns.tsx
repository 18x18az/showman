import { ColumnDef } from '@tanstack/react-table'
import { useEditSceneMutation, useRemoveSceneMutation } from '@/__generated__/graphql'
import { TextInput } from '@/components/ui/data-table'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Trash2 } from 'lucide-react'

interface Scene {
  readonly id: number
  readonly name: string
  readonly key: string
}

export const Columns: Array<ColumnDef<Scene>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const rename = useErrorableMutation(useEditSceneMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void rename({ variables: { id: row.original.id, data: { name } } }) }} />
      )
    }
  },
  {
    accessorKey: 'key',
    header: 'Key',
    cell: ({ row }) => {
      const rename = useErrorableMutation(useEditSceneMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.key} updateValue={(key) => { void rename({ variables: { id: row.original.id, data: { key } } }) }} />
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ErrorableButton tooltip='Delete Field' variant='ghost' mutation={useRemoveSceneMutation} options={{ variables: { id: row.original.id }, refetchQueries: ['Cameras'] }}><Trash2 /></ErrorableButton>
    }
  }
]
