import { motion } from 'framer-motion'

interface MatchNameProps {
  readonly match: string
  readonly time: number
  readonly phase: 'auto' | 'driver' | null
}

export function MatchName (props: MatchNameProps): JSX.Element {
  return (
    <div className='fixed top-0 w-full flex justify-center'>
      <motion.div
        className='rounded-b-xl w-1/2 bg-zinc-900 opacity-[0.97]'
        initial={{ width: 0, height: 0 }}
        animate={{ width: [80, 900], height: 90 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className='text-6xl p-2 text-center text-slate-300 mt-1'
          initial={{ opacity: 0, transform: 'translateY(-80px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ delay: 0.16, type: 'spring', stiffness: 40, damping: 10 }}
        >
          {props.match}
        </motion.div>
      </motion.div>
    </div>
  )
}
