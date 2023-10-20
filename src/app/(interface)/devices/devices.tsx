'use client'

import { JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'
import { DataTable } from './data-table'
import { Columns } from './columns'
//import { selectCanAccessDevices } from '@/lib/redux'
//import { accessRedirect } from '@/utils/AccessRedirect'

export function Devices (): JSX.Element {
  //accessRedirect(selectCanAccessDevices)
  const deviceInfo = JsonTopic<User[]>('users', [])
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={deviceInfo} />
    </div>
  )
}
