import { Meta } from '@storybook/react'
import { MatchName } from './MatchName'

const meta: Meta<typeof MatchName> = {
  component: MatchName
}

export default meta

export const Primary = {
  args: {
    match: 'Qualification Match 25',
    time: 150,
    phase: 'auto'
  }
}
