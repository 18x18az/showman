'use client'

import { JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'
import { DataTable } from './data-table'
import { Columns } from './columns'
import { Header } from '@/components/primitives/Header'
// import { selectCanAccessDevices } from '@/lib/redux'
// import { accessRedirect } from '@/utils/AccessRedirect'

export function Devices (): JSX.Element {
  // accessRedirect(selectCanAccessDevices)
  const deviceInfo = JsonTopic<User[]>('users', [])

  return (
    <>
      <Header name='Devices' description='View and manage devices.' />
      <DataTable columns={Columns} data={deviceInfo} />
    </>

  )
}
