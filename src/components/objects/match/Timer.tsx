'use client'

import { offsetTimer } from '@/app/display/field/[uuid]/timer'
import { motion } from 'framer-motion'

interface TimerProps {
  readonly time: Date | undefined
  readonly period: 'auto' | 'driver' | 'none'
}

function ActualTimer(props: { time: Date, period: 'auto' | 'driver' | 'none' }): JSX.Element {
  let offset = offsetTimer(props.time)
  if (offset < 0) offset = 0

  const roundedSeconds = Math.ceil(offset / 1000)
  const minutes = Math.floor(roundedSeconds / 60).toString()
  const seconds = Math.floor(roundedSeconds % 60).toString().padStart(2, '0')
  const timeString = `${minutes}:${seconds}`

  const pulse = (props.period === 'driver' && roundedSeconds <= 5 && roundedSeconds > 0) ? 'animate-intense' : ''
  return (
    <motion.div
      className='fixed right-0 top-0 py-4 px-4 mr-48 bg-gray-600 bg-opacity-30 rounded-b-xl'
      initial={{ transform: 'translateY(-100%)' }}
      animate={{ transform: 'translateY(0%)' }}
      exit={{ transform: 'translateY(-100%)' }}
    >
      <div className={`text-6xl font-mono ${pulse}`}>
        {timeString}
      </div>
    </motion.div>
  )
}

export function Timer (props: TimerProps): JSX.Element {
  if (props.time === undefined) {
    return <></>
  }

  return <ActualTimer period={props.period} time={props.time} />
}
