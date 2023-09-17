import { Dropdown } from '../../primitives/Dropdown'
import { InputNumber } from '../../primitives/InputNumber'
import { Label } from '../../primitives/Label'

interface ScoringInputProps {
  alliance: 'red' | 'blue'
}

const TITLE_STYLE = 'col-span-2 align-center text-slate-12 flex items-center justify-center'

const ELEVATION_OPTIONS = ['NONE', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export function ScoringInput (props: ScoringInputProps): JSX.Element {
  const allianceCapitalized = props.alliance.charAt(0).toUpperCase() + props.alliance.slice(1)
  const allianceTriballTText = `${allianceCapitalized} alliance triballs scored in`
  return (
    <div className='grid grid-cols-2 justify-evenly lg:mx-0 md:mx-8 gap-x-4 md:gap-x-32 xl:gap-x-4 gap-y-4 lg:gap-x-8 md:gap-y-8'>

      <div className={TITLE_STYLE}>{allianceTriballTText}</div>
      <Label title='Either goal'>
        <InputNumber value={0} onChange={val => {}} />
      </Label>
      <Label title='Either zone'>
        <InputNumber value={0} onChange={val => {}} />
      </Label>

      <div className={TITLE_STYLE}>Triballs scored in</div>
      <Label title={`${allianceCapitalized} goal`}>
        <InputNumber value={0} onChange={val => {}} />
      </Label>
      <Label title={`${allianceCapitalized} zone`}>
        <InputNumber value={0} onChange={val => {}} />
      </Label>

      <div className={TITLE_STYLE}>Elevation</div>

      <Label title='Robot 1'>
        <Dropdown value={ELEVATION_OPTIONS[0]} options={ELEVATION_OPTIONS} onChange={() => {}} />
      </Label>
      <Label title='Robot 2'>
        <Dropdown value={ELEVATION_OPTIONS[0]} options={ELEVATION_OPTIONS} onChange={() => {}} />
      </Label>

    </div>
  )
}
