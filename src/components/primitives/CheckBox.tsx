import * as Checkbox from '@radix-ui/react-checkbox'
import { SyncableResourceState } from './SyncedResource'
import { CheckIcon } from '@radix-ui/react-icons'

const ROOT_STYLE = 'bg-slate-3 hover:bg-slate-4 focus:bg-slate-5 active:bg-slate-6 border border-slate-6 focus:border-slate-7 rounded items-center justify-center h-4 w-4 hover:ring-slate-7'
const CHECK_STYLE = 'text-slate-12 self-center h-4 w-4'

export interface CheckBoxProps {
  id: string
  value: boolean | undefined
  onChange?: (value: Checkbox.CheckedState) => void
}

export function CheckBox (props: CheckBoxProps): JSX.Element {
  const { value, setValueLocal, setValueUpstream } = SyncableResourceState({
    initial: false,
    onChange: props.onChange
  })

  setValueUpstream(props.value)

  return (
    <Checkbox.Root onCheckedChange={state => setValueLocal(state as boolean)} checked={value} className={ROOT_STYLE} defaultChecked>
      <Checkbox.Indicator>
        <CheckIcon className={CHECK_STYLE} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
