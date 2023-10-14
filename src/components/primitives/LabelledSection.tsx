interface LabelledSectionProps {
  readonly label: string
  readonly children: React.ReactNode
}

export function LabelledSection (props: LabelledSectionProps): JSX.Element {
  return (
    <div>
      <div className='mb-4 flex justify-evenly text-slate-11'>{props.label}</div>
      <div className='flex justify-evenly'>{props.children}</div>
    </div>
  )
}
