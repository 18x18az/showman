'use client'

import { Delete, EmptyPost, JsonTopic } from '@/utils/maestro'
import { User } from '@18x18az/maestro-interfaces'

function deleteDevice(id: number) {
  Delete(`users/${id.toString()}`)
}

export function Devices (): JSX.Element {
  const deviceInfo = JsonTopic<User[]>('users', [])
  const devices = deviceInfo.map((device) => {
    return <div key={device.userId.toString()}>{device.name} | {device.role} | <button onClick={() => {deleteDevice(device.userId)}}>Delete</button></div>
  })
  return (
    <>
      {devices}
    </>
  )
}
