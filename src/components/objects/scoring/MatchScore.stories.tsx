import { Meta } from '@storybook/react'
import { MatchScore } from './MatchScore'

const meta: Meta<typeof MatchScore> = {
  component: MatchScore,
  argTypes: {
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
    isElim: false
  }
}
