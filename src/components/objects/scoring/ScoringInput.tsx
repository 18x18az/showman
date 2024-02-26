import { LabelledSection } from '../../primitives/LabelledSection'
import { Dropdown } from '../../../primitives/dropdown/Dropdown'
import { InputNumber } from '../../primitives/InputNumber'
import { Label } from '../../primitives/Label'
import { AllianceScoreFullFragment, Color, Tier, useEditAllianceScoreMutation } from '../../../__generated__/graphql'
import { useErrorableMutation } from '../../../hooks/useErrorableMutation'

interface ScoringInputProps {
  readonly alliance: 'red' | 'blue'
  readonly locked: boolean
  readonly data: AllianceScoreFullFragment
  readonly matchId: number
}

const ELEVATION_OPTIONS = Object.values(Tier)

export function ScoringInput (props: ScoringInputProps): JSX.Element {
  const updateScore = useErrorableMutation(useEditAllianceScoreMutation, { refetchQueries: ['WorkingScore'] })
  const { data } = props
  const allianceCapitalized = props.alliance.charAt(0).toUpperCase() + props.alliance.slice(1)
  const allianceTriballText = `${allianceCapitalized} alliance triballs scored in`

  const matchId = props.matchId
  const color: Color = props.alliance === 'red' ? Color.Red : Color.Blue

  return (
    <>
      <LabelledSection label={allianceTriballText}>
        <Label title='Either goal'>
          <InputNumber
            locked={props.locked} value={data.allianceInGoal} minimum={0} maximum={2} onChange={val => {
              void updateScore({ variables: { matchId, color, edit: { allianceInGoal: val } } })
            }}
          />
        </Label>
        <Label title='Either zone'>
          <InputNumber
            locked={props.locked} value={data.allianceInZone} minimum={0} maximum={2} onChange={val => {
              void updateScore({ variables: { matchId, color, edit: { allianceInZone: val } } })
            }}
          />
        </Label>
      </LabelledSection>

      <LabelledSection label='Triballs scored in'>
        <Label title={`${allianceCapitalized} goal`}>
          <InputNumber
            locked={props.locked} value={data.triballsInGoal} minimum={0} onChange={val => {
              void updateScore({ variables: { matchId, color, edit: { triballsInGoal: val } } })
            }}
          />
        </Label>
        <Label title={`${allianceCapitalized} zone`}>
          <InputNumber
            locked={props.locked} value={data.triballsInZone} minimum={0} onChange={val => {
              void updateScore({ variables: { matchId, color, edit: { triballsInZone: val } } })
            }}
          />
        </Label>
      </LabelledSection>

      <LabelledSection label='Elevation'>
        <Label title='1'>
          <Dropdown locked={props.locked} value={data.robot1Tier} options={ELEVATION_OPTIONS} onChange={() => {}} />
        </Label>
        <Label title='2'>
          <Dropdown locked={props.locked} value={data.robot2Tier} options={ELEVATION_OPTIONS} onChange={() => {}} />
        </Label>
      </LabelledSection>
    </>
  )
}
