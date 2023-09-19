import { Meta } from '@storybook/react'
import { AllianceInput } from './AllianceInput'

const meta: Meta<typeof AllianceInput> = {
  component: AllianceInput,
  argTypes: {
    alliance: {
      control: {
        type: 'radio',
        options: ['red', 'blue']
      }
    },
    isElim: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    alliance: 'red',
    isElim: false,
    locked: false,
    hidden: false,
    score: 12,
    teams: ['127C', '6030J']
  }
}
