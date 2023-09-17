export interface InputNumberProps {
  value: number
  minimum?: number
  maximum?: number
  onChange: (value: number) => void
}

interface ValidatorOptions {
  minimum?: number
  maximum?: number
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

const INPUT_STYLE = 'text-slate-12 bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-5 \
 border-slate-7 focus:border-slate-8 border-solid border \
 w-24 p-2 rounded focus:outline-none'

export function InputNumber (props: InputNumberProps): JSX.Element {

  const onChangeEvent = (value: number): void => {
    if(validate(value, props)) {
      props.onChange(value)
    }
  }

  return (
    <input
      className={INPUT_STYLE}
      type='number'
      inputMode='decimal'
      value={props.value}
      onChange={evt => onChangeEvent(Number(evt.target.value))}
      min={props.minimum}
      max={props.maximum}
    />
  )
}
