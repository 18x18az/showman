import { CommonFieldInfo } from './common'
import { RemoveAction } from './actions'
import { SittingInformationFragment } from '@/__generated__/graphql'

function onDeckOptions (match: SittingInformationFragment | null): JSX.Element[] {
  const options: JSX.Element[] = []

  if (match !== null) {
    options.push(<RemoveAction sittingId={match.id} key='remove' />)
  }

  return options
}

export function OnDeck (props: { readonly fieldId: number, readonly match: SittingInformationFragment | null }): JSX.Element {
  const options = onDeckOptions(props.match)
  const text = undefined

  return <CommonFieldInfo match={props.match} options={options} status={undefined} text={text} />
}
