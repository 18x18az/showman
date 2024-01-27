'use client'

import { offsetTimer } from '@/app/display/field/[uuid]/timer'
import { AnimatePresence, motion } from 'framer-motion'

interface TimerProps {
  readonly time: string | undefined
  readonly period: 'auto' | 'driver' | 'none'
}

function ActualTimer (props: { time: string, period: 'auto' | 'driver' | 'none' }): JSX.Element {
  let offset = offsetTimer(props.time)
  if (offset < 0) offset = 0

  const roundedSeconds = Math.ceil(offset / 1000)
  const minutes = Math.floor(roundedSeconds / 60).toString()
  const seconds = Math.floor(roundedSeconds % 60).toString().padStart(2, '0')
  const timeString = `${minutes}:${seconds}`

  const pulse = (props.period === 'driver' && roundedSeconds <= 5 && roundedSeconds > 0) ? 'animate-intense' : ''
  return (
    <motion.div
      className='fixed right-0 top-0 py-4 px-4 mr-48 bg-zinc-900 bg-opacity-[0.97] rounded-b-xl text-zinc-200'
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
  let content = <div key='empty' />

  if (props.time !== undefined) {
    content = <ActualTimer key='timer' period={props.period} time={props.time} />
  }

  return (
    <AnimatePresence>
      {content}
    </AnimatePresence>
  )
}
