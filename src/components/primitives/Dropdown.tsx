import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { ExpandButton } from './ExpandButton'

interface DropdownProps {
  id: string
  value: string | undefined
  options: string[]
  defaultOption: string
  onChange: (value: string) => void
}

const VIEWPORT_STYLE = 'bg-slate-4 rounded-md p-2'
const ITEM_STYLE = 'relative flex items-center px-8 py-2 rounded-md text-sm text-slate-12 hover:bg-indigo-8 focus:bg-indigo-8 focus:outline-none'
const UP_STYLE = 'flex items-center justify-center text-slate-12'

export function Dropdown (props: DropdownProps): JSX.Element {
  return (
    <Select.Root value={props.value} onValueChange={value => props.onChange(value)}>
      <Select.Trigger className='focus:outline-none'>
        <ExpandButton>
          <Select.Value placeholder={props.defaultOption} />
          <Select.Icon className='ml-2'>
            <ChevronDownIcon />
          </Select.Icon>
        </ExpandButton>
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton className={UP_STYLE}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className={VIEWPORT_STYLE}>
          <Select.Group>
            {props.options.map((option, i) => (
              <Select.Item key={`${option}-${i}`} value={option} className={ITEM_STYLE}>
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
