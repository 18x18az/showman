import { TextInput } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { useFieldNamesQuery, useRenameDisplayMutation, useSetDisplayFieldMutation } from '../../../../__generated__/graphql'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../../../../components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

interface Display {
  readonly uuid: string
  readonly name: string
  readonly field: {
    id: number
    name: string
  } | null
}

export const Columns: Array<ColumnDef<Display>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const [rename] = useRenameDisplayMutation({ refetchQueries: ['Displays'] })
      return (
        <TextInput value={row.original.name} updateValue={(name) => { void rename({ variables: { name, uuid: row.original.uuid } }) }} />
      )
    }
  },
  {
    accessorKey: 'field',
    header: 'Field',
    cell: ({ row }) => {
      const field = row.original.field
      const uuid = row.original.uuid

      const current = field === null ? 'None' : field.name

      const { data } = useFieldNamesQuery({ pollInterval: 500 })
      const [setField] = useSetDisplayFieldMutation({ refetchQueries: ['Displays'] })

      if (data === undefined) return <></>

      const dropDownMenuItems = [<DropdownMenuItem key={0} onClick={() => { void setField({ variables: { uuid, fieldId: null } }) }}>None</DropdownMenuItem>]

      data.fields.forEach(field => {
        dropDownMenuItems.push(<DropdownMenuItem key={field.id} onClick={() => { void setField({ variables: { uuid, fieldId: field.id } }) }}>{field.name}</DropdownMenuItem>)
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>{current}</DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropDownMenuItems}
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  }

]
