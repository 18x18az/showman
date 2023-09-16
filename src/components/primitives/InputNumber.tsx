'use client'
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

const INPUT_STYLE = 'text-slate-12 bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-5 border-slate-7 focus:border-slate-8 border-solid border w-24 p-2 rounded text-slate-12 focus:outline-none'

export function InputNumber (props: InputNumberProps): JSX.Element {
  const { value, setValueLocal, setValueUpstream } = SyncableResourceState({
    initial: 0,
    validator: (value: number) => validator(value, props),
    onChange: props.onChange
  })

  setValueUpstream(props.value)

  return (
    <input
      className={INPUT_STYLE}
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
