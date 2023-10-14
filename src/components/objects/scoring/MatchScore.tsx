import { AllianceInput } from './AllianceInput'
import { SaveBar } from './SaveBar'

interface MatchScoreProps {
  readonly matchName: string
  readonly isElim: boolean
  readonly alliances: { red: string[], blue: string[] }
  readonly locked: boolean
  readonly hidden: boolean
  readonly score: { red: number, blue: number }
}

export function MatchScore (props: MatchScoreProps): JSX.Element {
  return (
    <div>
      <div className='flex justify-evenly desktop:m-4 text-slate-12 desktop:mt-8  mt-2 mb-2 tablet:mt-4 tablet:text-lg desktop:text-2xl desktop:font-semibold'>
        {props.matchName}
      </div>
      <div className='flex divide-y-2 divide-gray-6 tablet:divide-y-0 flex-col desktop:flex-row desktop:justify-center gap-8'>
        <AllianceInput isElim={props.isElim} alliance='red' teams={props.alliances.red} locked={props.locked} hidden={props.hidden} score={props.score.red} />
        <AllianceInput isElim={props.isElim} alliance='blue' teams={props.alliances.blue} locked={props.locked} hidden={props.hidden} score={props.score.blue} />
      </div>
      <SaveBar locked={props.locked} hidden={props.hidden} />
    </div>

  )
}
