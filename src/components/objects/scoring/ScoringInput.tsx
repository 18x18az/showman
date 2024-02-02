import { LabelledSection } from '../../primitives/LabelledSection'
import { Dropdown } from '../../../primitives/dropdown/Dropdown'
import { InputNumber } from '../../primitives/InputNumber'
import { Label } from '../../primitives/Label'

interface ScoringInputProps {
  readonly alliance: 'red' | 'blue'
  readonly locked: boolean
}

const ELEVATION_OPTIONS = ['—', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export function ScoringInput (props: ScoringInputProps): JSX.Element {
  const allianceCapitalized = props.alliance.charAt(0).toUpperCase() + props.alliance.slice(1)
  const allianceTriballText = `${allianceCapitalized} alliance triballs scored in`
  return (
    <>
      <LabelledSection label={allianceTriballText}>
        <Label title='Either goal'>
          <InputNumber locked={props.locked} value={0} minimum={0} maximum={2} onChange={val => {}} />
        </Label>
        <Label title='Either zone'>
          <InputNumber locked={props.locked} value={0} minimum={0} maximum={2} onChange={val => {}} />
        </Label>
      </LabelledSection>

      <LabelledSection label='Triballs scored in'>
        <Label title={`${allianceCapitalized} goal`}>
          <InputNumber locked={props.locked} value={0} minimum={0} onChange={val => {}} />
        </Label>
        <Label title={`${allianceCapitalized} zone`}>
          <InputNumber locked={props.locked} value={0} minimum={0} onChange={val => {}} />
        </Label>
      </LabelledSection>

      <LabelledSection label='Elevation'>
        <Label title='1'>
          <Dropdown locked={props.locked} value={ELEVATION_OPTIONS[0]} options={ELEVATION_OPTIONS} onChange={() => {}} />
        </Label>
        <Label title='2'>
          <Dropdown locked={props.locked} value={ELEVATION_OPTIONS[0]} options={ELEVATION_OPTIONS} onChange={() => {}} />
        </Label>
      </LabelledSection>
    </>
  )
}
