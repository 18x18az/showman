import { useEffect, useState } from 'react'

export interface InputNumberProps {
  value: number
  minimum?: number
  maximum?: number
  onChange: (value: number) => void
  locked?: boolean
}

interface ValidatorOptions {
  minimum?: number
  maximum?: number
  enabled?: boolean
}

function validate (value: number, options: ValidatorOptions): boolean {
  if (options.minimum !== undefined && value < options.minimum) {
    return false
  }

  if (options.maximum !== undefined && value > options.maximum) {
    return false
  }

  return true
}

const INPUT_STYLE = 'text-slate-12 bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-5 ' +
 'border-slate-7 focus:border-slate-8 border-solid border ' +
 'w-16 sm:w-24 p-2 rounded focus:outline-none disabled:border-slate-6 disabled:bg-slate-4 disabled:hover:bg-slate-4'

export function InputNumber (props: InputNumberProps): JSX.Element {
  const [value, setValue] = useState(props.value)
  const [lastGood, setLastGood] = useState(props.value)

  // Use effect to update the value when the props change
  useEffect(() => {
    setValue(props.value)
    setLastGood(props.value)
  }, [props.value])

  const onChangeEvent = (value: number): void => {
    if (validate(value, props)) {
      setValue(value)
      setLastGood(value)
      props.onChange(value)
    } else {
      setValue(lastGood)
    }
  }

  const onSmallUpdate = (value: number): void => {
    setValue(value)
    if (validate(value, props)) {
      setLastGood(value)
      props.onChange(value)
    }
  }

  return (
    <input
      className={INPUT_STYLE}
      type='number'
      inputMode='decimal'
      value={value.toString()}
      onBlur={evt => onChangeEvent(Number(evt.target.value))}
      onChange={evt => onSmallUpdate(Number(evt.target.value))}
      min={props.minimum}
      max={props.maximum}
      disabled={props.locked === true}
    />
  )
}
