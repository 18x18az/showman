import { TextInput } from '@/components/ui/data-table'
import { Field } from '@/contracts/fields'
import { Post } from '@/utils/maestro'
import { ColumnDef } from '@tanstack/react-table'

async function updateName (fieldId: number, name: string): Promise<void> {
  const url = `fields/${fieldId}/name`
  await Post(url, { name })
}

export const Columns: Array<ColumnDef<Field>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.id, name) }} />
  },
  {
    accessorKey: 'isEnabled',
    header: 'Enabled',
    cell: ({ row }) => <>{row.original.isEnabled ? "True" : "False"}</>
  },
  {
    accessorKey: 'isCompetition',
    header: 'Competition',
    cell: ({ row }) => <>{row.original.isCompetition ? "True" : "False"}</>
  }
]
