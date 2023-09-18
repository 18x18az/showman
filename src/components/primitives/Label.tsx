interface LabelProps {
  children: React.ReactNode
  title: string
  className?: string
}

export function Label (props: LabelProps): JSX.Element {
  return (
    <div className='flex justify-center mb-4 tablet:mb-8 w-32'>
      <div className='flex items-center text-slate-12 pr-4 text-right'>{props.title}</div>
      <div className='flex items-center'>{props.children}</div>
    </div>
  )
}
