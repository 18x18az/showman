interface IconButtonProps {
    onClick: () => void
    children: React.ReactNode
    locked?: boolean
    activeColor?: string
}

export function IconButton(props: IconButtonProps): JSX.Element {
    const activeColor = props.activeColor ?? "bg-slate-6"
    return (
        <button disabled={props.locked} className={`p-4 ${activeColor} rounded-full disabled:bg-slate-4 hover:opacity-90 disabled:hover:opacity-100 active:opacity-70`}>
            {props.children}
        </button>
    )
}
