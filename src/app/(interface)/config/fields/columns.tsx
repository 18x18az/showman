import { TextInput } from '@/components/ui/data-table'
import { Post } from '@/utils/maestro'
import { FieldInfoBroadcast } from '@18x18az/maestro-interfaces'
import { ColumnDef } from '@tanstack/react-table'

async function updateName (fieldId: number, name: string): Promise<void> {
  const url = `fields/${fieldId}/name`
  await Post(url, { name })
}

export const Columns: Array<ColumnDef<FieldInfoBroadcast>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.fieldId, name) }} />
  }
]
