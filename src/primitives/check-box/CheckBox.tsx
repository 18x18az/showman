import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const SIZE = 'h-6 w-6'
const ROOT_STYLE = 'disabled:bg-slate-2 bg-slate-3 disabled:hover:bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-6 border border-slate-7 disabled:border-slate-4 focus:border-slate-8 rounded items-center justify-center hover:ring-slate-8'
const CHECK_STYLE = 'text-slate-11 self-center'

export interface CheckBoxProps {
  readonly value: boolean
  readonly onChange: (value: boolean) => void
  readonly locked?: boolean
}

export function CheckBox (props: CheckBoxProps): JSX.Element {
  return (
    <Checkbox.Root disabled={props.locked} onCheckedChange={state => props.onChange(state as boolean)} checked={props.value} className={`${ROOT_STYLE} ${SIZE}`} defaultChecked>
      <Checkbox.Indicator>
        <CheckIcon className={`${CHECK_STYLE} ${SIZE}`} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
