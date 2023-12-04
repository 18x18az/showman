import { TextInput } from '@/components/ui/data-table'
import { Field } from '@/contracts/fields'
import { Delete, Post } from '@/utils/maestro'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../../../components/ui/button'
import { Trash2 } from 'lucide-react'

async function updateName (fieldId: number, name: string): Promise<void> {
  const url = `field/${fieldId}/name`
  await Post(url, { name })
}

async function removeField (fieldId: number): Promise<void> {
  const url = `field/${fieldId}`
  await Delete(url)
}

export const Columns: Array<ColumnDef<Field>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.id, name) }} />
  },
  {
    accessorKey: 'isCompetition',
    header: 'Competition',
    cell: ({ row }) => <>{row.original.isCompetition ? 'True' : 'False'}</>
  },
  {
    accessorKey: 'isSkills',
    header: 'Skills Enabled',
    cell: ({ row }) => <>{row.original.isSkills ? 'True' : 'False'}</>
  },
  {
    id: 'actions',
    cell: ({ row }) => <Button onClick={() => { void removeField(row.original.id) }} variant='ghost'><Trash2 /></Button>
  }
]
