'use client'

import { FieldTable } from './field-table'
import { Columns } from './columns'
import { useAddFieldMutation, useFieldsQuery } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

export function FieldEditor (): JSX.Element {
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
    <div className='w-full'>
      <FieldTable columns={Columns} data={fields} />
      <ErrorableButton mutation={useAddFieldMutation} options={{ refetchQueries: ['Fields'] }}>Add</ErrorableButton>
    </div>
  )
}
