import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within, fireEvent } from '@testing-library/react'

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
    value: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('spinbutton')
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(1)
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(0)
  }
}

export const WithMinimum: Story = {
  args: {
    ...Primary.args,
    minimum: 0
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('spinbutton')
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(1)
  }
}

export const WithMaximum: Story = {
  args: {
    ...Primary.args,
    maximum: 10
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('spinbutton')
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '10' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(10)
    fireEvent.change(input, { target: { value: '11' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(10)
    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(-1)
  }
}

export const WithMinimumAndMaximum: Story = {
  args: {
    ...Primary.args,
    minimum: 0,
    maximum: 10
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('spinbutton')
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '10' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(10)
    fireEvent.change(input, { target: { value: '11' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(10)
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(0)
    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.blur(input)
    await expect(input).toHaveValue(0)
  }
}

export const WithUpstream: Story = {
  args: {
    ...Primary.args,
    value: 5
  }
}
