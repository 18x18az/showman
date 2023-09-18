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
    isElim: false,
    matchName: 'Qualification 27',
    alliances: {
      red: ['127C', '6030J'],
      blue: ['5090X', '8800T']
    }
  }
}
