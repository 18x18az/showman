import { useState } from 'react'
import { CheckBox } from '../../primitives/CheckBox'

interface InspectionItemProps {
  description: string
  rules: string[]
  met: boolean
  onChange?: (value: boolean) => void
  hideComplete: boolean
}

export function InspectionItem (props: InspectionItemProps): JSX.Element {
  const [isMet, setMet] = useState(props.met)

  const onChange = (value: boolean): void => {
    setMet(value)
    props.onChange?.(value)
  }

  if (props.hideComplete && isMet) {
    return <></>
  }

  const ruleText = props.rules.join(', ')
  return (
    <div className='flex bg-slate-3 rounded-lg text-slate-12 text-sm mb-2 mx-2'>
      <div className='px-2 py-2.5 flex-none content-center'><CheckBox value={props.met} onChange={onChange} /></div>
      <div className='flex-1 px-2 py-2'>{props.description}</div>
      <div className='px-4 flex-none py-2 w-16 text-center content-center'>{ruleText}</div>
    </div>
  )
}
