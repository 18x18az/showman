'use client'

import { EmptyPost, JsonTopic } from '@/utils/maestro'
import { FieldTable } from './field-table'
import { Columns } from './columns'
import { Field } from '@/contracts/fields'
import { Button } from '@/components/ui/button'

async function addField (): Promise<void> {
  await EmptyPost('field/add')
}

export default function Page (): JSX.Element {
  const fields = JsonTopic<Field[]>('fields')

  if (fields === undefined) {
    return (
      <div>
        <div>Fields</div>
        <div>Fields are not yet configured.</div>
      </div>
    )
  }

  return (
    <div>
      <FieldTable columns={Columns} data={fields} />
      <Button onClick={() => { void addField() }}>Add</Button>
    </div>
  )
}
