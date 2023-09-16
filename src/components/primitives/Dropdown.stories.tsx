import { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  argTypes: {
    id: {
      control: {
        type: 'text',
        defaultValue: 'test'
      }
    },
    options: {
      control: {
        type: 'array'
      }
    },
    defaultOption: {
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Dropdown>

const DEFAULT_OPTIONS = ['None', 'A', 'B', 'C']

export const Primary: Story = {
  args: {
    id: 'test',
    options: DEFAULT_OPTIONS,
    defaultOption: DEFAULT_OPTIONS[0]
  }
}
