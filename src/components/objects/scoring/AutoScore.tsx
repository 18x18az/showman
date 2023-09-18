import { CheckBox } from '../../primitives/CheckBox'
import { Label } from '../../primitives/Label'

interface AutoScoreProps {
  isElim: boolean
}

export function AutoScore (props: AutoScoreProps): JSX.Element {
  let winPoint

  if (!props.isElim) {
    winPoint = (
      <Label title='WP'>
        <CheckBox value={false} onChange={() => {}} />
      </Label>
    )
  }

  return (
    <div className='flex justify-evenly'>
      <Label title='Win'>
        <CheckBox value={false} onChange={() => {}} />
      </Label>
      <Label title='Tie'>
        <CheckBox value={false} onChange={() => {}} />
      </Label>
      {winPoint}
    </div>
  )
}
