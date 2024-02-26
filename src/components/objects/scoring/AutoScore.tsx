import { LabelledSection } from '../../primitives/LabelledSection'
import { CheckBox } from '../../../primitives/check-box/CheckBox'
import { Label } from '../../primitives/Label'
import { Color, Winner, useEditAllianceScoreMutation, useEditScoreMutation } from '../../../__generated__/graphql'
import { useErrorableMutation } from '../../../hooks/useErrorableMutation'

interface AutoScoreProps {
  readonly matchId: number
  readonly isElim: boolean
  readonly locked: boolean
  readonly alliance: 'red' | 'blue'
  readonly winner: Winner | null
  readonly gotAwp: boolean | null
}

export function AutoScore (props: AutoScoreProps): JSX.Element {
  const setAutoWinner = useErrorableMutation(useEditScoreMutation, { refetchQueries: ['WorkingScore'] })
  const setAllianceInfo = useErrorableMutation(useEditAllianceScoreMutation, { refetchQueries: ['WorkingScore'] })

  let winPoint
  if (props.gotAwp !== null) {
    const gotAwp = props.gotAwp
    winPoint = (
      <Label title='AWP'>
        <CheckBox
          locked={props.locked} value={gotAwp} onChange={() => {
            const setValue = !gotAwp
            const color: Color = props.alliance === 'red' ? Color.Red : Color.Blue
            void setAllianceInfo({ variables: { matchId: props.matchId, color, edit: { autoWp: setValue } } })
          }}
        />
      </Label>
    )
  }

  const wonAuto = props.winner === props.alliance.toUpperCase()
  const tiedAuto = props.winner === Winner.Tie

  return (
    <div className='flex justify-evenly'>
      <LabelledSection label='Auto'>

        <Label title='Win'>
          <CheckBox
            locked={props.locked} value={wonAuto} onChange={() => {
              const autoWinner: Winner = !wonAuto ? props.alliance.toUpperCase() as Winner : Winner.None
              void setAutoWinner({ variables: { matchId: props.matchId, edit: { autoWinner } } })
            }}
          />
        </Label>
        <Label title='Tie'>
          <CheckBox
            locked={props.locked} value={tiedAuto} onChange={() => {
              const autoWinner: Winner = !tiedAuto ? Winner.Tie : Winner.None
              void setAutoWinner({ variables: { matchId: props.matchId, edit: { autoWinner } } })
            }}
          />
        </Label>
        {winPoint}
      </LabelledSection>
    </div>
  )
}
