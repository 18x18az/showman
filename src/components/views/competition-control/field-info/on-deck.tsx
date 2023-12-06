import { Field } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { CommonFieldInfo, FieldStatus } from './common'
import { RemoveAction } from './actions'

function isOnWrongField (field: Field, match: Match | null): boolean {
  const expectedFieldId = match?.fieldId

  if (expectedFieldId !== undefined && expectedFieldId !== field.id) {
    return true
  }

  return false
}
function onDeckOptions (match: Match | null): JSX.Element[] {
  const options: JSX.Element[] = []

  if (match !== null) {
    options.push(<RemoveAction match={match} />)
  }

  return options
}

function onDeckText (field: Field, match: Match | null): string | undefined {
  if (isOnWrongField(field, match)) {
    return match?.fieldName !== undefined ? `Exp ${match.fieldName}` : undefined
  }
}

function onDeckStatus (field: Field, match: Match | null): FieldStatus | undefined {
  if (isOnWrongField(field, match)) {
    return FieldStatus.WRONG_FIELD
  }
}
export function OnDeck (props: { field: Field, match: Match | null }): JSX.Element {
  const status = onDeckStatus(props.field, props.match)
  const options = onDeckOptions(props.match)
  const text = onDeckText(props.field, props.match)

  return <CommonFieldInfo match={props.match} options={options} status={status} text={text} />
}
