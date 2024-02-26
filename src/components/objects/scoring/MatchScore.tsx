import { ScrollArea } from '../../ui/scroll-area'
import { AllianceInput } from './AllianceInput'
import { SaveBar } from './SaveBar'

interface MatchScoreProps {
  readonly matchId: number
}

export function MatchScore (props: MatchScoreProps): JSX.Element {
  const isElim = false
  const alliances = {
    red: ['127C'],
    blue: ['5090X']
  }
  const locked = false
  const hidden = false
  const score = {
    red: 0,
    blue: 0
  }
  return (
    <ScrollArea className='flex-grow'>
      <div className='flex divide-y-2 divide-gray-6 tablet:divide-y-0 flex-col desktop:flex-row desktop:justify-center gap-8'>
        <AllianceInput isElim={isElim} alliance='red' teams={alliances.red} locked={locked} hidden={hidden} score={score.red} />
        <AllianceInput isElim={isElim} alliance='blue' teams={alliances.blue} locked={locked} hidden={hidden} score={score.blue} />
      </div>
      <SaveBar locked={locked} hidden={hidden} />
    </ScrollArea>

  )
}
