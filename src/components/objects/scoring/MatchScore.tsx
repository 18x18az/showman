import { AllianceInput } from './AllianceInput'

interface MatchScoreProps {
  isElim: boolean
}

export function MatchScore (props: MatchScoreProps): JSX.Element {
  return (
    <div className='flex flex-col desktop:flex-row'>
      <AllianceInput isElim={props.isElim} alliance='red' />
      <AllianceInput isElim={props.isElim} alliance='blue' />
    </div>
  )
}
