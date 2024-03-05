'use client'

import { useAddSceneMutation, useScenesQuery } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { DisplayTable } from '@/components/ui/data-table/display-table'
import { Columns } from './columns'

export default function Page (): JSX.Element {
  const { data } = useScenesQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  return (
    <div>
      <DisplayTable data={data.scenes} columns={Columns} />
      <ErrorableButton mutation={useAddSceneMutation} options={{ refetchQueries: ['Scenes'] }}>Add</ErrorableButton>
    </div>
  )
}
