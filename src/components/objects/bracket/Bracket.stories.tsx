import { Meta } from '@storybook/react'
import { Bracket } from './Bracket'

const meta: Meta<typeof Bracket> = {
  component: Bracket,
  argTypes: {
    r16: {
      control: {
        type: 'array'
      }
    },
    qf: {
      control: {
        type: 'array'
      }
    },
    sf: {
      control: {
        type: 'array'
      }
    },
    f: {
      control: {
        type: 'array'
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    r16: [
      undefined,
      {
        redAlliance: ['12345A', '54321Z'],
        blueAlliance: ['5090X', '5090Z'],
        winner: 'red'
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
    qf: [
      {
        redAlliance: ['6030J', '8800T'],
        blueAlliance: ['12345A', '54321Z'],
        winner: undefined
      },
      {
        redAlliance: undefined,
        blueAlliance: undefined,
        winner: undefined
      },
      {
        redAlliance: undefined,
        blueAlliance: undefined,
        winner: undefined
      },
      {
        redAlliance: undefined,
        blueAlliance: undefined,
        winner: undefined
      }
    ],
    sf: [
      {
        redAlliance: undefined,
        blueAlliance: undefined,
        winner: undefined
      },
      {
        redAlliance: undefined,
        blueAlliance: undefined,
        winner: undefined
      }
    ],
    f: {
      redAlliance: undefined,
      blueAlliance: undefined,
      winner: undefined
    }
  }
}
