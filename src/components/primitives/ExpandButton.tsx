import React from 'react'

const BUTTON_STYLE = 'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-slate-4 hover:bg-slate-5 focus:bg-slate-6 text-slate-12 focus:outline-none'

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {}

const ExpandButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props} className={BUTTON_STYLE}>
      {children}
    </button>
  )
)

export { ExpandButton }
