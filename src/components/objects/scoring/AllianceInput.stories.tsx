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
    isElim: false
  }
}
