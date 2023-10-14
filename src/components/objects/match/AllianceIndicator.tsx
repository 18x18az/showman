import { motion } from 'framer-motion'

interface AllianceIndicatorProps {
  readonly alliance: 'red' | 'blue'
  readonly teams: string[]
  readonly wonAuto: boolean
}

export function AllianceIndicator (props: AllianceIndicatorProps): JSX.Element {
  const side = props.alliance === 'red' ? 'left-0' : 'right-0'
  const rounding = props.alliance === 'red' ? 'rounded-r-xl' : 'rounded-l-xl'
  const border = props.alliance === 'red' ? 'border-l-4 border-red-9 pl-4' : 'border-r-4 border-blue-9 pr-4'

  const offset = 1.3

  let wonAutoIndicator

  const wonAutoOffset = props.teams.length === 2 ? 'mb-52' : 'mb-36'

  if (props.wonAuto) {
    wonAutoIndicator = (
      <motion.div
        className={`bg-gray-600 ${rounding} px-4 py-2 fixed flex-col justify-center ${wonAutoOffset} ${side}`}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animate={{ backgroundColor: 'rgba(39,39,39,0.6)' }}
      >
        <motion.div
          className={`text-2xl text-white ${border}`}
          initial={{ opacity: 0, letterSpacing: '-0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          Auton Winner
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className={`h-48 flex flex-col justify-center fixed bottom-0 ${side}`}>

      {wonAutoIndicator}

      <motion.div
        className={`px-4 py-2 flex flex-col justify-center bg-gray-600 bg-opacity-30 ${rounding}`}
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animate={{ backgroundColor: 'rgba(39,39,39,0.6)' }}
        transition={{ delay: 0.4 + offset, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className={`${border}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: offset }}
        >
          {props.teams.map(team => {
            return (
              <motion.div
                className='text-6xl text-white'
                key={team}
                initial={{ opacity: 0, letterSpacing: '-0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0' }}
                transition={{ delay: 0.31 + offset, type: 'spring', stiffness: 100, damping: 20 }}
              >{team}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
