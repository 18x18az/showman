import { Alliance } from './Alliance'

export interface PairingInfo {
  redAlliance: string[]
  blueAlliance: string[]
  winner: 'red' | 'blue' | undefined
  column: string
  row: string
}

interface PairingProps extends PairingInfo {
  side: 'left' | 'right'
}

export function Pairing (props: PairingProps): JSX.Element {
  const hasWinner = props.winner !== undefined
  let isRedWinner
  let isBlueWinner

  if (hasWinner) {
    isRedWinner = props.winner === 'red'
    isBlueWinner = props.winner === 'blue'
  }

  return (
    <div className={`${props.column} ${props.row} justify flex justify-center`}>
      <div className='flex flex-col justify-center gap-y-2'>
        <Alliance teams={props.redAlliance} alliance='red' won={isRedWinner} side={props.side} />
        <Alliance teams={props.blueAlliance} alliance='blue' won={isBlueWinner} side={props.side} />
      </div>
    </div>
  )
}
