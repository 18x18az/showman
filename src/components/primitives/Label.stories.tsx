import { Meta } from '@storybook/react'
import { InputNumber } from './InputNumber'
import { Label } from './Label'

interface LabelledNumInputProps {
  label: string
  onChange: (value: number) => void
}

function LabelledNumInput (props: LabelledNumInputProps): JSX.Element {
  return (
    <Label title={props.label}>
      <InputNumber value={0} onChange={props.onChange} />
    </Label>
  )
}

const meta: Meta<typeof LabelledNumInput> = {
  component: LabelledNumInput,
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    label: 'Enter value'
  }
}
