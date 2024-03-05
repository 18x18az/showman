'use client'

import { useAddCameraMutation, useCamerasQuery } from '@/__generated__/graphql'
import { DisplayTable } from '@/components/ui/data-table/display-table'
import { Columns } from './columns'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

export default function Page (): JSX.Element {
  const { data } = useCamerasQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  const cameras = data.cameras

  return (
    <div>
      <DisplayTable data={cameras} columns={Columns} />
      <ErrorableButton mutation={useAddCameraMutation} options={{ refetchQueries: ['Cameras'] }}>Add</ErrorableButton>
    </div>
  )
}
