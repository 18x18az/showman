import { Meta } from '@storybook/react'
import { Alliance } from './Alliance'

const meta: Meta<typeof Alliance> = {
  component: Alliance,
  argTypes: {
    teams: {
      control: {
        type: 'array'
      }
    },
    alliance: {
      control: {
        type: 'radio',
        options: ['red', 'blue']
      }
    },
    won: {
      control: {
        type: 'radio',
        options: [true, false, undefined]
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    teams: ['127C', '6030J'],
    alliance: 'red',
    won: undefined
  }
}
