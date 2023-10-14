import { Meta } from '@storybook/react'
import { ScoringInput } from './ScoringInput'

const meta: Meta<typeof ScoringInput> = {
  component: ScoringInput,
  argTypes: {
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
    alliance: 'red'
  }
}
