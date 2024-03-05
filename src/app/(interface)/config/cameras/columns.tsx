import { ColumnDef } from '@tanstack/react-table'
import { useEditCameraMutation, useEditSceneMutation, useRemoveCameraMutation } from '@/__generated__/graphql'
import { TextInput } from '@/components/ui/data-table'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Trash2 } from 'lucide-react'

interface Camera {
  readonly id: number
  readonly ip: string
  readonly name: string
  readonly scene: {
    readonly id: number
    readonly name: string
  }
}

export const Columns: Array<ColumnDef<Camera>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const rename = useErrorableMutation(useEditCameraMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void rename({ variables: { id: row.original.id, data: { name } } }) }} />
      )
    }
  },
  {
    accessorKey: 'scene',
    header: 'Scene',
    cell: ({ row }) => {
      const rename = useErrorableMutation(useEditSceneMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.scene.name} updateValue={(name) => { void rename({ variables: { id: row.original.id, data: { name } } }) }} />
      )
    }
  },
  {
    accessorKey: 'ip',
    header: 'IP',
    cell: ({ row }) => {
      const changeIp = useErrorableMutation(useEditCameraMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.ip} updateValue={(ip) => { void changeIp({ variables: { id: row.original.id, data: { ip } } }) }} />
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ErrorableButton tooltip='Delete Field' variant='ghost' mutation={useRemoveCameraMutation} options={{ variables: { id: row.original.id }, refetchQueries: ['Cameras'] }}><Trash2 /></ErrorableButton>
    }
  }
]
