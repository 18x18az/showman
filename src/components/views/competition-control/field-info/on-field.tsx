import { Field, LiveFieldSubscription, MATCH_STAGE, OnDeckFieldSubscription, SelectedField } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { CommonFieldInfo, FieldStatus } from './common'
import { PutOnDeckAction, RemoveAction, ReplayAction } from './actions'

function FieldOptions (field: Field, match: Match | null, stage: MATCH_STAGE, liveField: SelectedField, onDeckField: SelectedField): JSX.Element[] {
  const thisField = field.id

  if (liveField === undefined || onDeckField === undefined || match === null) {
    return []
  }

  const options: JSX.Element[] = []

  if (liveField !== thisField && onDeckField !== thisField && stage === MATCH_STAGE.QUEUED) {
    options.push(<PutOnDeckAction field={field} />)
  }

  if (stage === MATCH_STAGE.SCORING || stage === MATCH_STAGE.OUTRO) {
    options.push(<ReplayAction match={match} />)
  }

  if (liveField !== thisField && stage === MATCH_STAGE.QUEUED) {
    options.push(<RemoveAction match={match} />)
  }

  return options
}
export function OnField (props: { field: Field, match: Match | null, stage: MATCH_STAGE }): JSX.Element {
  const liveField = LiveFieldSubscription()
  const onDeckField = OnDeckFieldSubscription()
  const stage = props.stage
  const fieldId = props.field.id
  const options = FieldOptions(props.field, props.match, stage, liveField, onDeckField)

  let status: FieldStatus | undefined

  if (liveField === fieldId) {
    status = FieldStatus.ACTIVE
  } else if (onDeckField === fieldId) {
    status = FieldStatus.ON_DECK
  }

  let text: string | undefined

  if (props.stage === MATCH_STAGE.SCORING || stage === MATCH_STAGE.OUTRO) {
    text = 'SCORING'
  }

  return <CommonFieldInfo match={props.match} options={options} text={text} status={status} />
}
