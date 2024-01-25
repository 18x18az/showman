import { OnDeck } from './on-deck'
import { OnField } from './on-field'
import { MatchStage, SittingWithTeamsFragment, useGetCompetitionFieldsQuery } from '../../../../__generated__/graphql'

interface FieldInfoProps {
  name: string
  stage: MatchStage
  id: number
  sOnField: SittingWithTeamsFragment | null
  sOnTable: SittingWithTeamsFragment | null
  isLive: boolean
  isOnDeck: boolean
}

function FieldInfo (props: FieldInfoProps): JSX.Element {
  return (
    <div className='flex flex-col gap-8 w-96 mb-8 items-center justify-center h-full'>
      <h1 className='text-center text-2xl font-sans text-slate-11'>{props.name}</h1>
      <OnField fieldId={props.id} stage={props.stage} match={props.sOnField} isLive={props.isLive} isOnDeck={props.isOnDeck} />
      <OnDeck fieldId={props.id} match={props.sOnTable} />
    </div>
  )
}

export function FieldInfos (): JSX.Element {
  const { data } = useGetCompetitionFieldsQuery({
    pollInterval: 500
  })

  if (data === undefined) {
    return <>Loading</>
  }

  const fields = data.fields

  const fieldControls = fields.map((field) => {
    const compInfo = field.competition

    const stage = compInfo === null ? MatchStage.Empty : compInfo.stage
    const onField = compInfo === null ? null : compInfo.onFieldSitting
    const onTable = compInfo === null ? null : compInfo.onTableSitting
    const isLive = compInfo === null ? false : compInfo.isLive
    const isOnDeck = compInfo === null ? false : compInfo.isOnDeck

    return (
      <FieldInfo isLive={isLive} stage={stage} isOnDeck={isOnDeck} id={field.id} name={field.name} key={field.id} sOnField={onField} sOnTable={onTable} />
    )
  })

  return (
    <div className='flex justify-center h-full mb-16'>{fieldControls}</div>
  )
}
