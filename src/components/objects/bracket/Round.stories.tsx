import { Meta } from '@storybook/react'
import { Round } from './Round'

const meta: Meta<typeof Round> = {
  component: Round,
  argTypes: {
    pairings: {
      control: {
        type: 'array'
      }
    },
    side: {
      control: {
        type: 'radio',
        options: ['left', 'right']
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    pairings: [
      {
        redAlliance: ['127C', '6030J'],
        blueAlliance: ['5090X', '5090Z'],
        winner: undefined
      },
      {
        redAlliance: ['127C', '6030J'],
        blueAlliance: ['5090X', '5090Z'],
        winner: undefined
      },
      {
        redAlliance: ['127C', '6030J'],
        blueAlliance: ['5090X', '5090Z'],
        winner: undefined
      },
      {
        redAlliance: ['127C', '6030J'],
        blueAlliance: ['5090X', '5090Z'],
        winner: undefined
      }
    ],
    side: 'left'
  }
}
