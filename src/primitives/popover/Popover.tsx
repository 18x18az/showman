import * as Base from '@radix-ui/react-popover'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '../button/Button'

interface PopoverPops {
  readonly title: string
  readonly children: React.ReactNode
}

const CONTENT_STYLE = 'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-50 w-48 rounded-lg p-4 shadow-md md:w-56 bg-slate-5'

export function Popover (props: PopoverPops): JSX.Element {
  return (
    <Base.Root>
      <Base.Trigger asChild>
        <Button variant='ghost' className='w-fit p-0 data-[state=open]:bg-muted'>{props.title}</Button>
      </Base.Trigger>
      <Base.Content align='center' sideOffset={4} className={CONTENT_STYLE}>
        <Base.Arrow className='fill-current text-slate-5' />
        {props.children}
        <Base.Close className='absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-indigo-9 focus-visible:ring-opacity-75'>
          <Cross1Icon className='h-4 w-4 text-slate-11 hover:text-slate-12' />
        </Base.Close>
      </Base.Content>
    </Base.Root>
  )
}
