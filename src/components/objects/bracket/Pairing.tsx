import { Alliance } from './Alliance'

export interface PairingInfo {
  readonly redAlliance: string[]
  readonly blueAlliance: string[]
  readonly winner: 'red' | 'blue' | undefined
  readonly column: string
  readonly row: string
}

interface PairingProps extends PairingInfo {
  readonly side: 'left' | 'right'
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
