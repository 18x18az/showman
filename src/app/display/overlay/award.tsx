import { motion } from 'framer-motion'
import { LogoReelCorner } from '../../../components/ui/logos/logo-reel-corner'
import { AwardStage } from '../../../__generated__/graphql'

interface Winner {
  number: string
  name: string
  location: string
}
interface AwardOverlayProps {
  award: {
    name: string
    winners: Winner[] | null
  } | null
  stage: AwardStage
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

function WinnerDisplay (props: { readonly winners: Winner[] }): JSX.Element {
  const winners = props.winners

  let lines: string[]

  if (winners.length === 1) {
    lines = [
            `${winners[0].number} - ${winners[0].name}`,
            winners[0].location
    ]
  } else {
    lines = [
            `${winners[0].number} - ${winners[0].name}`,
            `${winners[1].number} - ${winners[1].name}`
    ]
  }

  return (
    <div className='h-48 flex flex-col justify-center fixed bottom-0 left-0'>
      <motion.div
        className='px-4 py-2 flex flex-col justify-center rounded-br-2xl rounded-tr-md'
        initial={{ backgroundColor: 'rgba(24,24,27,0)' }}
        animate={{ backgroundColor: 'rgba(24,24,27,.97)' }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className='border-l-4 border-white pl-4'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {lines.map(line => {
            return (
              <motion.div
                className='text-6xl text-white'
                key={line}
                initial={{ opacity: 0, letterSpacing: '-0.5em', width: '10rem' }}
                animate={{ opacity: 1, letterSpacing: '0', width: '90vw' }}
                transition={{ delay: 0.31, type: 'spring', stiffness: 50, damping: 20 }}
              >{line}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}

export function AwardOverlay (props: AwardOverlayProps): JSX.Element {
  const { award, stage } = props

  if (award === null) return <LogoReelCorner />

  const winners = award.winners

  if (winners === null) return <LogoReelCorner />

  let title = <></>
  let winner = <></>

  if (stage === AwardStage.Intro || stage === AwardStage.Revealed) {
    title = <AwardTitle title={award.name} />
  }

  if (stage === AwardStage.Revealed) {
    winner = <WinnerDisplay winners={winners} />
  }

  return (
    <div>
      <LogoReelCorner />
      {title}
      {winner}
    </div>
  )
}
