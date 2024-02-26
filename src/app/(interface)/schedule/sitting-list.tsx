'use client'

import { SittingTable } from './sitting-table'
import { Columns } from './columns'
import { useGetScheduleQuery } from '../../../__generated__/graphql'

export function SittingList (): JSX.Element {
  const { data } = useGetScheduleQuery({ pollInterval: 500 })

  if (data === undefined) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return <SittingTable columns={Columns} data={data.sittings} />
}
