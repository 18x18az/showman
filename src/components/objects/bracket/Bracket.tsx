import { Lines } from './Lines'
import { PairingInfo } from './Pairing'
import { Round } from './Round'
import { useMeasure } from 'react-use'

interface BracketProps {
  r16: Array<PairingInfo | undefined>
  qf: Array<PairingInfo | undefined>
  sf: Array<PairingInfo | undefined>
  f: (PairingInfo | undefined)
}

export function Bracket (props: BracketProps): JSX.Element {
  // first 4 ro16
  const r16Left = props.r16.slice(0, 4)
  const r16Right = props.r16.slice(4, 8)
  // first 2 qf
  const qfLeft = props.qf.slice(0, 2)
  const qfRight = props.qf.slice(2, 4)
  // first sf
  const sfLeft = props.sf.slice(0, 1)
  const sfRight = props.sf.slice(1, 2)

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <div ref={ref} className='grid w-full h-screen grid-cols-7 grid-rows-7 bg-gray-1'>
      <Lines width={width} height={height} {...props} />
      <Round pairings={r16Left} side='left' />
      <Round pairings={qfLeft} side='left' />
      <Round pairings={sfLeft} side='left' />
      <Round pairings={[props.f]} side='final' />
      <Round pairings={sfRight} side='right' />
      <Round pairings={qfRight} side='right' />
      <Round pairings={r16Right} side='right' />
    </div>
  )
}
