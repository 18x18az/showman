'use client'

import { JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'
import { DataTable } from './data-table'
import { Columns } from './columns'

export function Devices (): JSX.Element {
  const deviceInfo = JsonTopic<User[]>('users', [])
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={deviceInfo} />
    </div>
  )
}
