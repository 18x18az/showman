'use client'

import { FieldTable } from './field-table'
import { Columns } from './columns'
import { Button } from '@/components/ui/button'
import { useFieldsQuery } from '../../../../__generated__/graphql'

export default function Page (): JSX.Element {
  const { data } = useFieldsQuery()

  if (data === undefined) {
    return (
      <div>
        <div>Fields</div>
        <div>Fields are not yet configured.</div>
      </div>
    )
  }

  const fields = data.fields

  return (
    <div>
      <FieldTable columns={Columns} data={fields} />
      <Button onClick={() => { }}>Add</Button>
    </div>
  )
}
