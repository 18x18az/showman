export interface AllianceProps {
  teams: string[] | undefined
  alliance: 'red' | 'blue'
  won: boolean | undefined
  side: 'left' | 'right'
}

export function Alliance (props: AllianceProps): JSX.Element {
  // XOR side is right and alliance is red to account for mirroring
  const skew = (props.side === 'right') !== (props.alliance === 'red') ? 'skew-x-12' : '-skew-x-12'
  let blueColor = 'border-blue-9'
  let redColor = 'border-red-9'
  let bgColor = 'bg-slate-5'
  let textColor = 'text-slate-12'

  if (props.won === false) {
    blueColor = 'border-blue-5'
    redColor = 'border-red-5'
    bgColor = 'bg-slate-3'
    textColor = 'text-slate-9'
  }

  const teamText = props.teams?.join(' ')

  const border = props.alliance === 'red' ? `border-b-4 ${redColor}` : `border-t-4 ${blueColor}`

  // center vertically and horizontally
  return (
    <div className='flex justify-center w-56'>
      <div className={`absolute ${textColor} z-10 py-3 text-2xl`}>{teamText}</div>
      <div className={`z-0 w-full h-14 ${bgColor} ${skew} mx-2 flex justify-center content-center py-2 rounded-sm ${border}`} />
    </div>
  )
}
