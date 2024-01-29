import { CommonFieldInfo, FieldStatus } from './common'
import { PutOnDeckAction, RemoveAction, ReplayAction } from './actions'
import { MatchStage, SittingWithTeamsFragment } from '@/__generated__/graphql'
import { Countdown } from '@/app/display/field/[uuid]/timer'

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

interface OnFieldProps {
  readonly fieldId: number
  readonly match: SittingWithTeamsFragment | null
  readonly stage: MatchStage
  readonly isLive: boolean
  readonly isOnDeck: boolean
}

export function OnField (props: OnFieldProps): JSX.Element {
  const { fieldId, match, isLive, isOnDeck } = props
  const sittingId = match !== null ? match.id : null
  const stage = props.stage
  const time = match?.scheduled

  const options = FieldOptions(fieldId, sittingId, stage, isLive, isOnDeck)

  let status: FieldStatus | undefined

  if (isLive) {
    status = FieldStatus.ACTIVE
  } else if (isOnDeck) {
    status = FieldStatus.ON_DECK
  }

  let text: JSX.Element | undefined

  if (stage === MatchStage.Scoring) {
    text = <>Scoring</>
  } else if (stage === MatchStage.Queued && time !== null) {
    text = <Countdown time={time} />
  }

  return <CommonFieldInfo match={match} options={options} text={text} status={status} />
}
