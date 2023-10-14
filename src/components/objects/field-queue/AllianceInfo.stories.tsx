import { Meta } from '@storybook/react'
import { AllianceInfo } from './AllianceInfo'

const meta: Meta<typeof AllianceInfo> = {
  component: AllianceInfo,
  argTypes: {
    teams: {
      control: {
        type: 'array'
      }
    },
    alliance: {
      control: {
        type: 'inline-radio',
        options: ['red', 'blue']
      }
    }
  }
}

export default meta

export const Primary = {
  args: {
    teams: ['127C', '54321Z'],
    alliance: 'red'
  }
}
