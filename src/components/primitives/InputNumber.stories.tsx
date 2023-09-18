import type { Meta, StoryObj } from '@storybook/react'

import { InputNumber } from './InputNumber'

const meta: Meta<typeof InputNumber> = {
  component: InputNumber,
  argTypes: {
    minimum: {
      control: {
        type: 'number'
      }
    },
    maximum: {
      control: {
        type: 'number'
      }
    },
    value: {
      control: {
        type: 'number'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof InputNumber>

export const Primary: Story = {
  args: {
    value: 0
  }
}
