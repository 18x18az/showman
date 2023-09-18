import { CheckBox } from '../../primitives/CheckBox'
import { Label } from '../../primitives/Label'
import { Popover } from '../../primitives/Popover'

interface TeamMetaProps {
  team: string
  dq: boolean
  noShow: boolean
  locked: boolean
}

export function TeamMeta (props: TeamMetaProps): JSX.Element {
  return (
    <Popover title={props.team}>
      <Label reverse justify='left' title='DQ'>
        <CheckBox locked={props.locked} value={props.dq} onChange={() => {}} />
      </Label>
      <Label reverse justify='left' title='No Show'>
        <CheckBox locked={props.locked} value={props.noShow} onChange={() => {}} />
      </Label>
    </Popover>
  )
}
