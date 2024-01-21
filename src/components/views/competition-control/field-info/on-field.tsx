import { CommonFieldInfo, FieldStatus } from './common'
import { PutOnDeckAction, RemoveAction, ReplayAction } from './actions'
import { MatchStage } from '../../../../__generated__/graphql'
import { MatchIdentifier, SelectedField } from './interfaces'

function FieldOptions (fieldId: number, sittingId: number | null, stage: MatchStage, liveField: SelectedField, onDeckField: SelectedField): JSX.Element[] {
  const thisField = fieldId
  if (liveField === undefined || onDeckField === undefined || sittingId === null) {
    return []
  }

  const options: JSX.Element[] = []

  if (liveField !== thisField && onDeckField !== thisField && stage === MatchStage.Queued) {
    options.push(<PutOnDeckAction fieldId={thisField} key='push' />)
  }

  if (stage === MatchStage.Scoring) {
    options.push(<ReplayAction sittingId={sittingId} key='replay' />)
  }

  if (liveField !== thisField && stage === MatchStage.Queued) {
    options.push(<RemoveAction sittingId={sittingId} key='remove' />)
  }

  return options
}

export function OnField (props: { fieldId: number, match: MatchIdentifier | null, stage: MatchStage }): JSX.Element {
  const { fieldId, match } = props
  const matchId = match !== null ? match.id : null
  const stage = props.stage
  const liveField = null
  const onDeckField = null

  const options = FieldOptions(fieldId, matchId, stage, null, null)

  let status: FieldStatus | undefined

  if (liveField === props.fieldId) {
    status = FieldStatus.ACTIVE
  } else if (onDeckField === fieldId) {
    status = FieldStatus.ON_DECK
  }

  let text: string | undefined

  if (stage === MatchStage.Scoring) {
    text = 'SCORING'
  }

  return <CommonFieldInfo match={match} options={options} text={text} status={status} />
}
