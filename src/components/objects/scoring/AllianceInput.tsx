import { AllianceScoreFullFragment, Winner } from '../../../__generated__/graphql'
import { AutoScore } from './AutoScore'
import { ScoringInput } from './ScoringInput'
import { TeamMeta } from './TeamMeta'

interface AllianceInputProps {
  readonly alliance: 'red' | 'blue'
  readonly isElim: boolean
  readonly locked: boolean
  readonly hidden: boolean
  readonly data: AllianceScoreFullFragment
  readonly autoWinner: Winner | null
  readonly matchId: number
}

export function AllianceInput (props: AllianceInputProps): JSX.Element {
  const { data } = props
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
    allianceText += ` - ${data.score}`
  }

  return (
    <div className={'flex flex-col space-y-4 p-2 desktop:w-96 tablet:rounded tablet:p-8 tablet:m-4 tablet:mx-8 tablet:outline outline-2 tablet:rounded-lg tablet:bg-slate-3 desktop:p-4 desktop:mx-4 ' + outlineColor}>
      <div className={teamColor}>{allianceText}</div>
      <ScoringInput matchId={props.matchId} alliance={props.alliance} locked={props.locked} data={data} />
      <AutoScore matchId={props.matchId} isElim={props.isElim} locked={props.locked} alliance={props.alliance} winner={props.autoWinner} gotAwp={data.autoWp} />
      <div className='flex items-center justify-evenly'>
        {data.teams.map((team) => (
          <TeamMeta key={team.team.number} team={team.team.number} dq={false} noShow={false} locked={props.locked} />
        ))}
      </div>
    </div>
  )
}
