'use client'

import { JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'
import { DeviceTable } from './device-table'
import { Columns } from './columns'
import { Header } from '@/components/primitives/Header'
// import { selectCanAccessDevices } from '@/lib/redux'
// import { accessRedirect } from '@/utils/AccessRedirect'

export function Devices (): JSX.Element {
  // accessRedirect(selectCanAccessDevices)
  const deviceInfo = JsonTopic<User[]>('users')

  if (deviceInfo === undefined) {
    return (
      <div>
        <div>Devices</div>
        <div>Devices are not yet configured.</div>
      </div>
    )
  }

  return (
    <>
      <Header name='Devices' description='View and manage devices.' />
      <DeviceTable columns={Columns} data={deviceInfo} />
    </>

  )
}
