import { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  argTypes: {
    options: {
      control: {
        type: 'array'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Dropdown>

const DEFAULT_OPTIONS = ['None', 'A', 'B', 'C']

export const Primary: Story = {
  args: {
    options: DEFAULT_OPTIONS,
    value: DEFAULT_OPTIONS[0]
  }
}
