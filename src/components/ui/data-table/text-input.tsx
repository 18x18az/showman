import { useState } from "react"
import { Input } from "../input"

interface TextInputProps {
    readonly value: string
    updateValue: (value: string) => void
}

export function TextInput (props: TextInputProps): JSX.Element {
    const [value, setValue] = useState(props.value)

    const handleChange = (event: any): void => {
      event.preventDefault()
      if (event.target === null) {
        return
      }
      setValue(event.target.value)
    }

    const handleBlur = (event: any): void => {
      event.preventDefault()
      if (event.target === null) {
        return
      }
      props.updateValue(value)
    }

    return <Input value={value} className='border-none dark:bg-transparent bg-transparent p-0' onChange={handleChange} onBlur={handleBlur} />
  }