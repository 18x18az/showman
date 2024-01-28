import { Button } from "../../../primitives/button/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown-menu"

export type DropdownOption<T> = T & string

interface DropdownHeaderProps<T> {
    readonly current: DropdownOption<T>
    readonly options: DropdownOption<T>[]
    readonly stringGetter: (value: DropdownOption<T>) => string
    readonly updateValue: (value: DropdownOption<T>) => void
}

export function DropdownHeader<T> (props: DropdownHeaderProps<T>): JSX.Element {
    const options = Object.values(props.options).map(option => {
        const text = props.stringGetter(option)
        return <DropdownMenuItem key={option} onClick={() => { props.updateValue(option) }}>{text}</DropdownMenuItem>
    })

    const currentText = props.stringGetter(props.current)

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='p-0'>
              <span>{currentText}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options}
          </DropdownMenuContent>
        </DropdownMenu>
      )
}