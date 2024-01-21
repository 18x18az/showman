import { CommonFieldInfo, FieldStatus } from './common'
import { PutOnDeckAction, RemoveAction, ReplayAction } from './actions'
import { MatchStage } from '../../../../__generated__/graphql'
import { SittingIdentifier } from './interfaces'

function FieldOptions (fieldId: number, sittingId: number | null, stage: MatchStage, isLive: boolean, isOnDeck: boolean): JSX.Element[] {
  const thisField = fieldId
  if (sittingId === null) {
    return []
  }

  const options: JSX.Element[] = []

  if (!isLive && !isOnDeck && stage === MatchStage.Queued) {
    options.push(<PutOnDeckAction fieldId={thisField} key='push' />)
  }

  if (stage === MatchStage.Scoring) {
    options.push(<ReplayAction sittingId={sittingId} key='replay' />)
  }

  if (!isLive && stage === MatchStage.Queued) {
    options.push(<RemoveAction sittingId={sittingId} key='remove' />)
  }

  return options
}

export function OnField (props: { fieldId: number, match: SittingIdentifier | null, stage: MatchStage, isLive: boolean, isOnDeck: boolean }): JSX.Element {
  const { fieldId, match, isLive, isOnDeck } = props
  const sittingId = match !== null ? match.id : null
  const stage = props.stage

  const options = FieldOptions(fieldId, sittingId, stage, isLive, isOnDeck)

  let status: FieldStatus | undefined

  if (isLive) {
    status = FieldStatus.ACTIVE
  } else if (isOnDeck) {
    status = FieldStatus.ON_DECK
  }

  let text: string | undefined

  if (stage === MatchStage.Scoring) {
    text = 'SCORING'
  }

  return <CommonFieldInfo match={match} options={options} text={text} status={status} />
}
