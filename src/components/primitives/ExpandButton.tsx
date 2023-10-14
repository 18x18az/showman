import React from 'react'

const BUTTON_STYLE = 'w-16 inline-flex select-none items-center justify-center rounded-md font-medium bg-slate-4 disabled:hover:bg-slate-4 hover:bg-slate-5 focus:bg-slate-6 text-slate-12 focus:outline-none'
const SMALL_STYLE = 'w-16 text-sm px-4 py-2'
const LARGE_STYLE = 'w-32 text-2xl px-28 py-4'

type Props = Omit<React.ComponentProps<'button'>, 'className'> & { size?: 'S' | 'L' }

const ExpandButton = React.forwardRef<HTMLButtonElement, Props>(

  ({ children, ...props }, ref) => {
    let sizeStyle = SMALL_STYLE
    if (props.size === 'L') {
      sizeStyle = LARGE_STYLE
    }

    return (
      <button ref={ref} {...props} className={`${BUTTON_STYLE} ${sizeStyle}`}>
        {children}
      </button>
    )
  }
)

export { ExpandButton }
