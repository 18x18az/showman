import { PairingInfo } from './Pairing'

export interface FinalProps {
  pairing: PairingInfo | undefined
  row: string
  column: string
}
// create a trapezoid shaped div
export function Final (props: FinalProps): JSX.Element {
  return (
    <div className={`${props.row} ${props.column} flex justify-center`}>
      <div className='flex flex-col justify-center'>
        <div className='absolute -translate-x-1/2 flex flex-col justify-center gap-y-8'>
          <div className='w-56 h-20 bg-slate-5 border-red-9 border-b-4' style={{ clipPath: 'polygon(0 0, 100% 0, 94% 100%, 6% 100%)' }} />
          <div className='w-56 h-20 bg-slate-5 border-blue-9 border-t-4' style={{ clipPath: 'polygon(0 100%, 100% 100%, 94% 0%, 6% 0%)' }} />
        </div>
      </div>

    </div>
  )
}
