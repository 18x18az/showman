import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { ExpandButton } from './ExpandButton'

interface DropdownProps {
  readonly value: string
  readonly options: string[]
  readonly onChange: (value: string) => void
  readonly locked?: boolean
}

const VIEWPORT_STYLE = 'bg-slate-4 rounded-md p-2'
const ITEM_STYLE = 'relative flex items-center px-8 py-2 rounded-md text-sm text-slate-12 hover:bg-indigo-8 focus:bg-indigo-8 focus:outline-none'
const UP_STYLE = 'flex items-center justify-center text-slate-12'

export function Dropdown (props: DropdownProps): JSX.Element {
  let dropDownIcon

  if (props.locked !== true) {
    dropDownIcon = (
      <Select.Icon className='ml-2'>
        <ChevronDownIcon />
      </Select.Icon>
    )
  }

  return (
    <Select.Root value={props.value} onValueChange={value => props.onChange(value)}>
      <Select.Trigger disabled={props.locked} className='focus:outline-none'>
        <ExpandButton disabled={props.locked}>
          <Select.Value placeholder={props.value} />
          {dropDownIcon}
        </ExpandButton>
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton className={UP_STYLE}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className={VIEWPORT_STYLE}>
          <Select.Group>
            {props.options.map((option) => (
              <Select.Item key={option} value={option} className={ITEM_STYLE}>
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className='absolute left-2 inline-flex items-cetner'>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton>
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Root>
  )
}
