import { CheckCircledIcon } from '@radix-ui/react-icons'
import { IconButton } from './IconButton'
import { Meta } from '@storybook/react'

interface DemoButtonProps {
  readonly onClick: () => void
  readonly locked?: boolean
  readonly color: 'green' | 'red' | 'gray'
}

function DemoButton (props: DemoButtonProps): JSX.Element {
  const textColor = props.locked === true ? 'text-slate-6' : 'text-slate-12'
  return (
    <IconButton onClick={props.onClick} locked={props.locked} activeColor={props.color}>
      <CheckCircledIcon className={`w-8 h-8 ${textColor}`} />
    </IconButton>
  )
}

const meta: Meta<typeof DemoButton> = {
  component: DemoButton
}

export default meta

export const Primary = {
  args: {
    locked: false,
    color: 'bg-green-9'
  }
}
