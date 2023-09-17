interface LabelProps {
  children: React.ReactNode
  title: string
  className?: string
}

export function Label (props: LabelProps): JSX.Element {
  return (
    <div className='flex mb-4 md:mb-8'>
      <div className='flex flex-1 items-center text-slate-12 pr-2 text-right'>{props.title}</div>
      <div className='flex items-center'>{props.children}</div>
    </div>
  )
}
