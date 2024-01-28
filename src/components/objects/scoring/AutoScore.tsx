import { LabelledSection } from '../../primitives/LabelledSection'
import { CheckBox } from '../../../primitives/CheckBox'
import { Label } from '../../primitives/Label'

interface AutoScoreProps {
  readonly isElim: boolean
  readonly locked: boolean
}

export function AutoScore (props: AutoScoreProps): JSX.Element {
  let winPoint

  if (!props.isElim) {
    winPoint = (
      <Label title='AWP'>
        <CheckBox locked={props.locked} value={false} onChange={() => {}} />
      </Label>
    )
  }

  return (
    <div className='flex justify-evenly'>
      <LabelledSection label='Auto'>

        <Label title='Win'>
          <CheckBox locked={props.locked} value={false} onChange={() => {}} />
        </Label>
        <Label title='Tie'>
          <CheckBox locked={props.locked} value={false} onChange={() => {}} />
        </Label>
        {winPoint}
      </LabelledSection>
    </div>
  )
}
