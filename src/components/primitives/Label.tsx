interface LabelProps {
  readonly children: React.ReactNode
  readonly title: string
  readonly className?: string
  readonly reverse?: boolean
  readonly justify?: 'right' | 'left'
}

export function Label (props: LabelProps): JSX.Element {
  let justify = 'justify-center'

  if (props.justify === 'right') {
    justify = 'justify-end'
  } else if (props.justify === 'left') {
    justify = 'justify-start'
  }

  let direction = 'flex-row'
  if (props.reverse === true) {
    direction = 'flex-row-reverse'

    if (justify === 'justify-end') {
      justify = 'justify-start'
    } else if (justify === 'justify-start') {
      justify = 'justify-end'
    }
  }

  return (
    <div className={`${direction} flex ${justify} mb-4 tablet:mb-8 w-32 gap-x-4`}>
      <div className='flex items-center text-slate-12 text-right'>{props.title}</div>
      <div className='flex items-center'>{props.children}</div>
    </div>
  )
}
