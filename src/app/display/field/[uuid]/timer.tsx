'use client'

import { useOffsetTimer } from '@/hooks/useOffsetTimer'

interface TimerProps {
  time: string
}

export function Countdown (props: TimerProps): JSX.Element {
  const offset = useOffsetTimer(props.time)
  const sign = offset < 0 ? '+' : '-'
  const magnitude = Math.abs(offset) / 1000
  const seconds = Math.floor(magnitude % 60).toString().padStart(2, '0')
  const minutes = Math.floor(magnitude / 60).toString().padStart(2, '0')
  const time = `${sign}${minutes}:${seconds}`

  return <>{time}</>
}

export function Timer (props: TimerProps): JSX.Element {
  let offset = useOffsetTimer(props.time)
  if (offset < 0) offset = 0

  const roundedSeconds = Math.ceil(offset / 1000)
  const minutes = Math.floor(roundedSeconds / 60).toString()
  const seconds = Math.floor(roundedSeconds % 60).toString().padStart(2, '0')

  const time = `${minutes}:${seconds}`
  return <>{time}</>
}
