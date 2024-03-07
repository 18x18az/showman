import { motion } from 'framer-motion'

interface AwardOverlayProps {
  award: {
    name: string
    winners: Array<{
      number: string
      name: string
    }> | null
  } | null
}

function AwardTitle (props: { readonly title: string }): JSX.Element {
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
          {props.title}
        </motion.div>
      </motion.div>
    </div>
  )
}

export function AwardOverlay (props: AwardOverlayProps): JSX.Element {
  const { award } = props

  if (award === null) return <></>

  const winners = award.winners

  if (winners === null) return <></>

  return (
    <div>
      <AwardTitle title={award.name} />
    </div>
  )
}
