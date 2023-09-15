import { SyncableResourceState } from './SyncedResource'

export interface InputNumberProps {
  id: string
  value: number | undefined
  minimum?: number
  maximum?: number
  onChange?: (value: number) => void
}

interface ValidatorOptions {
  minimum?: number
  maximum?: number
}

function validator (value: number, options: ValidatorOptions): boolean {
  if (options.minimum !== undefined && value < options.minimum) {
    return false
  }

  if (options.maximum !== undefined && value > options.maximum) {
    return false
  }

  return true
}

export function InputNumber (props: InputNumberProps): JSX.Element {
  const { value, setValueLocal, setValueUpstream } = SyncableResourceState({
    initial: 0,
    validator: (value: number) => validator(value, props),
    onChange: props.onChange
  })

  setValueUpstream(props.value)

  return (
    <input
      type='number'
      inputMode='decimal'
      id={props.id}
      value={value === undefined ? '' : value}
      onChange={evt => setValueLocal(parseInt(evt.target.value, 10))}
      min={props.minimum}
      max={props.maximum}
    />
  )
}
