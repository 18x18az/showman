import { CommonFieldInfo, FieldStatus } from './common'
import { RemoveAction } from './actions'
import { FieldInfo, SittingIdentifier } from './interfaces'

function isOnWrongField (field: Field, match: Match | null): boolean {
  const expectedFieldId = match?.fieldId

  if (expectedFieldId !== undefined && expectedFieldId !== field.id) {
    return true
  }

  return false
}
function onDeckOptions (match: SittingIdentifier | null): JSX.Element[] {
  const options: JSX.Element[] = []

  if (match !== null) {
    options.push(<RemoveAction sittingId={match.id} key='remove' />)
  }

  return options
}

function onDeckText (field: FieldInfo, match: SittingIdentifier | null): string | undefined {
  if (isOnWrongField(field, match)) {
    return match?.fieldName !== undefined ? `Exp ${match.fieldName}` : undefined
  }
}

// function onDeckStatus (field: FieldInfo, match: MatchIdentifier | null): FieldStatus | undefined {
//   if (isOnWrongField(field, match)) {
//     return FieldStatus.WRONG_FIELD
//   }
// }

export function OnDeck (props: { fieldId: number, match: SittingIdentifier | null }): JSX.Element {
  // const status = onDeckStatus(props.field, props.match)
  const options = onDeckOptions(props.match)
  // const text = onDeckText(props.field, props.match)
  const text = undefined

  return <CommonFieldInfo match={props.match} options={options} status={undefined} text={text} />
}
