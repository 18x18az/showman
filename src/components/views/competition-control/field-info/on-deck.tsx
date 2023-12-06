import { Field } from '@/contracts/fields'
import { Match } from '@/contracts/match'
import { CommonFieldInfo, FieldStatus } from './common'

export function OnDeck (props: { field: Field, match: Match | null }): JSX.Element {
  const expectedFieldId = props.match?.fieldId

  let status: FieldStatus | undefined

  if (expectedFieldId !== undefined && expectedFieldId !== props.field.id) {
    status = FieldStatus.WRONG_FIELD
  }

  return <CommonFieldInfo match={props.match} options={[]} status={status} />
}
