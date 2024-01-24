'use client'

import { useDisplaysQuery } from '../../../../__generated__/graphql'
import { Columns } from './columns'
import { DisplayTable } from './display-table'

export default function Page (): JSX.Element {
  const { data } = useDisplaysQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  const displays = data.displays

  return <DisplayTable data={displays} columns={Columns} />
}
