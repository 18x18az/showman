import { useWorkingScoreQuery } from '../../../__generated__/graphql'
import { ScrollArea } from '../../ui/scroll-area'
import { AllianceInput } from './AllianceInput'
import { SaveBar } from './SaveBar'

interface MatchScoreProps {
  readonly matchId: number
}

export function MatchScore (props: MatchScoreProps): JSX.Element {
  const matchId = props.matchId
  const { data } = useWorkingScoreQuery({ variables: { id: matchId }, pollInterval: 500 })

  if (data === undefined) {
    return (
      <div>
        Loading
      </div>
    )
  }
  const scoring = data.match.workingScore

  const isElim = scoring.isElim
  const locked = false
  const hidden = false

  return (
    <ScrollArea className='flex-grow'>
      <div className='flex divide-y-2 divide-gray-6 tablet:divide-y-0 flex-col desktop:flex-row desktop:justify-center gap-8'>
        <AllianceInput autoWinner={scoring.autoWinner} matchId={matchId} isElim={isElim} alliance='red' locked={locked} hidden={hidden} data={scoring.red} />
        <AllianceInput autoWinner={scoring.autoWinner} matchId={matchId} isElim={isElim} alliance='blue' locked={locked} hidden={hidden} data={scoring.blue} />
      </div>
      <SaveBar locked={locked} hidden={hidden} />
    </ScrollArea>

  )
}
