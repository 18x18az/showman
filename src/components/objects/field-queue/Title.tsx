interface TitleProps {
  readonly title: string
}

export function Title (props: TitleProps): JSX.Element {
  return <div className='text-9xl text-slate-12 text-center mt-32'>{props.title}</div>
}
