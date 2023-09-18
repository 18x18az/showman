import { AutoScore } from './AutoScore'
import { ScoringInput } from './ScoringInput'

interface AllianceInputProps {
  alliance: 'red' | 'blue'
  isElim: boolean
}

export function AllianceInput (props: AllianceInputProps): JSX.Element {
  const blueOutline = 'outline-blue-9'
  const redOutline = 'outline-red-9'
  const blueText = 'text-blue-9'
  const redText = 'text-red-9'

  const textColor = `${props.alliance === 'red' ? redText : blueText}`
  const outlineColor = `${props.alliance === 'red' ? redOutline : blueOutline}`

  const teamColor = `${textColor} tablet:text-slate-12 text-lg flex items-center justify-center pb-2 tablet:items-start tablet:justify-start`
  const allianceCapitalized = props.alliance.charAt(0).toUpperCase() + props.alliance.slice(1)
  return (
    <div className={'m-1 p-2 rounded tablet:p-8 tablet:m-4 tablet:mx-8 tablet:outline outline-1 desktop:outline-2 desktop:rounded-lg bg-slate-3 desktop:p-4 desktop:mx-4 ' + outlineColor}>
      <div className={teamColor}>{`${allianceCapitalized} Alliance`}</div>
      <ScoringInput alliance={props.alliance} />
      <AutoScore isElim={props.isElim} />
    </div>
  )
}
