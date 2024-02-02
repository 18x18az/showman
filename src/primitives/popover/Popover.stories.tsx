import { Meta } from '@storybook/react'
import { Popover } from './Popover'

function DemoInstance (): JSX.Element {
  return (
    <Popover title='Hello World'>
      <div>Hi</div>
    </Popover>
  )
}

const meta: Meta<typeof DemoInstance> = {
  component: DemoInstance
}

export default meta

export const Primary = {
  args: {
    title: 'Example'
  }
}
