import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const ROOT_STYLE = 'bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-6 border border-slate-6 focus:border-slate-7 rounded items-center justify-center h-4 w-4 hover:ring-slate-7'
const CHECK_STYLE = 'text-slate-12 self-center h-4 w-4'

export interface CheckBoxProps {
  value: boolean
  onChange: (value: boolean) => void
}

export function CheckBox (props: CheckBoxProps): JSX.Element {
  return (
    <Checkbox.Root onCheckedChange={state => props.onChange(state as boolean)} checked={props.value} className={ROOT_STYLE} defaultChecked>
      <Checkbox.Indicator>
        <CheckIcon className={CHECK_STYLE} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
