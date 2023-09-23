import { motion } from 'framer-motion'

interface TimerProps {
  time: number | null
  period: 'auto' | 'driver' | 'none'
}

export function Timer (props: TimerProps): JSX.Element {
  if (props.time === null) {
    return <></>
  }

  // convert time in seconds to minutes and seconds
  const minutes = Math.floor(props.time / 60)
  const seconds = props.time % 60
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`

  const pulse = (props.period === 'driver' && props.time <= 5 && props.time > 0) ? 'animate-intense' : ''
  return (
    <motion.div
      className='fixed right-0 top-0 py-4 px-4 mr-6 bg-gray-600 bg-opacity-30 rounded-b-xl'
      initial={{ transform: 'translateY(-100%)' }}
      animate={{ transform: 'translateY(0%)' }}
      exit={{ transform: 'translateY(-100%)' }}
    >
      <div className={`text-6xl ${pulse}`}>
        {timeString}
      </div>
    </motion.div>
  )
}
