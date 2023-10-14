import { Meta } from '@storybook/react'
import { Pairing } from './Pairing'

const meta: Meta<typeof Pairing> = {
  component: Pairing,
  argTypes: {
    redAlliance: {
      control: {
        type: 'array'
      }
    },
    blueAlliance: {
      control: {
        type: 'array'
      }
    },
    winner: {
      control: {
        type: 'radio',
        options: ['red', 'blue', undefined]
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    redAlliance: ['127C', '6030J'],
    blueAlliance: ['5090X', '5090Z'],
    winner: undefined,
    offset: '[top:50%]'
  }
}
