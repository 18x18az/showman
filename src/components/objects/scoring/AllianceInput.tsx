import { AutoScore } from './AutoScore'
import { ScoringInput } from './ScoringInput'
import { TeamMeta } from './TeamMeta'

interface AllianceInputProps {
  readonly alliance: 'red' | 'blue'
  readonly isElim: boolean
  readonly teams: string[]
  readonly locked: boolean
  readonly hidden: boolean
  readonly score: number
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

  let allianceText = `${allianceCapitalized} Alliance`
  if (!props.hidden) {
    allianceText += ` - ${props.score}`
  }

  return (
    <div className={'flex flex-col space-y-4 p-2 desktop:w-96 tablet:rounded tablet:p-8 tablet:m-4 tablet:mx-8 tablet:outline outline-2 tablet:rounded-lg tablet:bg-slate-3 desktop:p-4 desktop:mx-4 ' + outlineColor}>
      <div className={teamColor}>{allianceText}</div>
      <ScoringInput alliance={props.alliance} locked={props.locked} />
      <AutoScore isElim={props.isElim} locked={props.locked} />
      <div className='flex items-center justify-evenly'>
        {props.teams.map((team, i) => (
          <TeamMeta key={`${team}-${i}`} team={team} dq={false} noShow={false} locked={props.locked} />
        ))}
      </div>
    </div>
  )
}
