import { motion } from 'framer-motion'

interface MatchNameProps {
  match: string
  time: number
  phase: 'auto' | 'driver' | null
}

export function MatchName (props: MatchNameProps): JSX.Element {
  return (
    <div className='fixed top-0 w-full flex justify-center'>
      <motion.div
        className='rounded-b-xl w-1/2'
        initial={{ backgroundColor: 'rgba(39,39,39,0.8)', width: 0, height: 0 }}
        animate={{ backgroundColor: 'rgba(39,39,39,0.8)', width: [80, 900], height: 90 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className='text-6xl p-2 text-center'
          initial={{ opacity: 0, transform: 'translateY(-80px)' }}
          animate={{ opacity: 1, letterSpacing: '0', transform: 'translateY(0px)' }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 40, damping: 10 }}
        >
          {props.match}
        </motion.div>
      </motion.div>
    </div>
  )
}
