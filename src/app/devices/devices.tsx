'use client'

import { Delete, JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'

async function deleteDevice (id: number): Promise<void> {
  await Delete(`users/${id.toString()}`)
}

export function Devices (): JSX.Element {
  const deviceInfo = JsonTopic<User[]>('users', [])
  const devices = deviceInfo.map((device) => {
    return <div key={device.userId.toString()}>{device.name} | {device.role} | <button onClick={() => { void deleteDevice(device.userId) }}>Delete</button></div>
  })
  return (
    <>
      {devices}
    </>
  )
}
