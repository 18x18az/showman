'use client'

import { JsonTopic } from '../../utils/maestro'
import { User } from '@18x18az/maestro-interfaces'

export function Devices (): JSX.Element {
  const deviceInfo = JsonTopic<User[]>('users', [])
  const devices = deviceInfo.map((device) => {
    return <div key={device.userId.toString()}>{device.name} | {device.role}</div>
  })
  return (
    <>
      {devices}
    </>
  )
}
