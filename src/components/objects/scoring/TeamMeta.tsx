import { CheckBox } from '../../../primitives/check-box/CheckBox'
import { Label } from '../../primitives/Label'
import { Popover } from '../../../primitives/popover/Popover'
import { useErrorableMutation } from '../../../hooks/useErrorableMutation'
import { TeamInformationFragment, useEditTeamMetaMutation } from '../../../__generated__/graphql'

interface TeamMetaProps {
  readonly matchId: number
  readonly team: TeamInformationFragment
  readonly dq: boolean
  readonly noShow: boolean
  readonly locked: boolean
}

export function TeamMeta (props: TeamMetaProps): JSX.Element {
  const editTeamMeta = useErrorableMutation(useEditTeamMetaMutation, { refetchQueries: ['WorkingScore'] })
  const { matchId, team } = props

  let titleClass = ''

  if (props.dq || props.noShow) {
    titleClass = 'line-through'
  }

  return (
    <Popover title={props.team.number} className={titleClass}>
      <Label reverse justify='left' title='DQ'>
        <CheckBox
          locked={props.locked} value={props.dq} onChange={() => {
            void editTeamMeta({ variables: { matchId, teamId: team.id, edit: { dq: !props.dq } } })
          }}
        />
      </Label>
      <Label reverse justify='left' title='No Show'>
        <CheckBox
          locked={props.locked} value={props.noShow} onChange={() => {
            void editTeamMeta({ variables: { matchId, teamId: team.id, edit: { noShow: !props.noShow } } })
          }}
        />
      </Label>
    </Popover>
  )
}
