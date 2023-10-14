import { motion } from 'framer-motion'

interface PeriodIndicatorProps {
  readonly period: 'auto' | 'driver' | 'none'
}

const baseConfig = 'absolute px-8 py-3 text-4xl rounded-xl'

const pathKeyframes = [
  'polygon(-10% 0%, 0% 0%, -10% 100%, -20% 100%)',
  'polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)',
  'polygon(0% 0%, 110% 0%, 100% 100%, -10% 100%)',
  'polygon(110% 0%, 210% 0%, 200% 100%, 100% 100%)'
]

const timingKeyframes = [
  0,
  0.25,
  0.9,
  1
]

const duration = 6

export function PeriodIndicator (props: PeriodIndicatorProps): JSX.Element {
  if (props.period === 'none') {
    return <></>
  }

  const text = props.period === 'auto' ? 'Autonomous Period' : 'Driver Control'

  return (
    <div className='fixed top-0 w-full mt-28 flex justify-center'>
      <motion.div
        className={`${baseConfig} border border-1 z-10 text-slateA-1`}
        animate={{ clipPath: pathKeyframes }}
        transition={{ duration, times: timingKeyframes }}
      >
        {text}
      </motion.div>

      <motion.div
        className={`${baseConfig} bg-gray-800 bg-o-30 z-0 bg-opacity-50`}
        // create a diagonal mask wipe animation from the middle working its way out
        animate={{ clipPath: pathKeyframes }}
        transition={{ delay: 0.2, duration, times: timingKeyframes }}
      >
        {text}
      </motion.div>
    </div>
  )
}
