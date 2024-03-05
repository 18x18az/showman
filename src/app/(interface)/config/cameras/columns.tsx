import { ColumnDef } from '@tanstack/react-table'
import { useEditCameraMutation } from '@/__generated__/graphql'
import { TextInput } from '@/components/ui/data-table'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'

interface Camera {
  readonly id: number
  readonly ip: string
  readonly name: string
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
    accessorKey: 'ip',
    header: 'IP',
    cell: ({ row }) => {
      const changeIp = useErrorableMutation(useEditCameraMutation, { refetchQueries: ['Cameras'] })
      return (
        <TextInput value={row.original.ip} updateValue={(ip) => { void changeIp({ variables: { id: row.original.id, data: { ip } } }) }} />
      )
    }
  }

]
