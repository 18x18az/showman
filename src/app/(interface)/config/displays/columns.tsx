import { DropdownHeader, TextInput } from '@/components/ui/data-table'
import { Post } from '@/utils/maestro'
import { DisplayConfig, FieldInfoBroadcast } from '@18x18az/maestro-interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { Field } from '../../interfaces'

interface DisplayConfigWithFields extends DisplayConfig {
  fields: Field[]
}

async function updateName (uuid: string, name: string): Promise<void> {
  const url = `displays/${uuid}/name`
  await Post(url, { name })
}

async function assignField (uuid: string, fieldId: number): Promise<void> {
  const url = `displays/${uuid}/assign`
  await Post(url, { fieldId })
}

export const Columns: Array<ColumnDef<DisplayConfigWithFields>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.uuid, name) }} />
  },
  {
    accessorKey: 'field',
    header: 'Field',
    cell: ({ row, table }) => {
      const currentId = row.original.fieldId
      let currentFieldName = 'Unassigned'

      if (currentId !== null) currentFieldName = row.original.fields.find((field) => { return field.id === currentId })?.name ?? 'Unassigned'

      const fieldNames = row.original.fields.map((field) => { return field.name })

      function handleAssignField (name: string): void {
        const field = row.original.fields.find((field) => { return field.name === name })
        if (field === undefined) return
        void assignField(row.original.uuid, field.id)
      }

      return <DropdownHeader updateValue={handleAssignField} current={currentFieldName} options={fieldNames} stringGetter={(v) => v} />
    }
  }

]
