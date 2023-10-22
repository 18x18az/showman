import { Separator } from '../ui/separator'

interface HeaderProps {
  readonly name: string
  readonly description: string
}

export function Header ({ name, description }: HeaderProps): JSX.Element {
  return (
    <>
      <div className='space-y-0.5'>
        <h2 className='text-2xl text-zinc-0 font-bold tracking-tight'>{name}</h2>
        <p className='text-zinc-400'>
          {description}
        </p>
      </div>
      <Separator className='my-6' />
    </>
  )
}
