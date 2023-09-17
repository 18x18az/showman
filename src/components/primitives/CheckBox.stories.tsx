import { Meta, StoryObj } from '@storybook/react'
import { CheckBox } from './CheckBox'

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  argTypes: {
    value: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof CheckBox>

export const Primary: Story = {
  args:
  {
    value: false
  }
}
