import { ScoringInput } from './ScoringInput'

interface AllianceInputProps {
  alliance: 'red' | 'blue'
}

export function AllianceInput (props: AllianceInputProps): JSX.Element {
  const blueOutline = 'outline-blue-9'
  const redOutline = 'outline-red-9'
  const blueText = 'text-blue-9'
  const redText = 'text-red-9'

  const textColor = `${props.alliance === 'red' ? redText : blueText}`
  const outlineColor = `${props.alliance === 'red' ? redOutline : blueOutline}`

  const teamColor = `${textColor} md:text-slate-12 text-lg flex items-center justify-center pb-2 md:items-start md:justify-start`
  const allianceCapitalized = props.alliance.charAt(0).toUpperCase() + props.alliance.slice(1)
  return (
    <div className={'m-1 p-2 rounded md:p-8 md:m-4 md:mx-8 md:outline outline-1 lg:outline-2 lg:rounded-lg bg-slate-3 lg:p-4 lg:mx-4 ' + outlineColor}>
      <div className={teamColor}>{`${allianceCapitalized} Alliance`}</div>
      <ScoringInput alliance={props.alliance} />
    </div>
  )
}
