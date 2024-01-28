import { CheckBox } from '../../../primitives/CheckBox'

interface InspectionItemProps {
  readonly description: string
  readonly met: boolean
  readonly onChange: (value: boolean) => void
  readonly hideComplete: boolean
}

export function InspectionItem (props: InspectionItemProps): JSX.Element {
  if (props.hideComplete && props.met) {
    return <></>
  }

  return (
    <div className='flex bg-zinc-900 rounded-lg text-zinc-300 text-md mb-2 mx-2 py-1'>
      <div className='px-2 py-2.5 flex-none content-center'><CheckBox value={props.met} onChange={() => { props.onChange(!props.met) }} /></div>
      <div className='flex-1 px-2 py-2'>{props.description}</div>
    </div>
  )
}
