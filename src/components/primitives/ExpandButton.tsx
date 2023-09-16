interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
}

const BUTTON_STYLE = 'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-slate-4 hover:bg-slate-5 focus:bg-slate-6 text-slate-12 focus:outline-none'

export function ExpandButton (props: ButtonProps): JSX.Element {
  return (
    <button onClick={props.onClick} className={BUTTON_STYLE}>
      {props.children}
    </button>
  )
}
