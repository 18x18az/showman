import { CompetitionFieldStatusSubscription, Field, FieldsSubscription } from '@/contracts/fields'
import { OnDeck } from './on-deck'
import { OnField } from './on-field'

function FieldInfo (props: { field: Field }): JSX.Element {
  const status = CompetitionFieldStatusSubscription(props.field.id)

  if (status === undefined) {
    return <>Loading...</>
  }

  return (
    <div className='flex flex-col gap-8 w-96 mb-8 items-center justify-center h-full'>
      <h1 className='text-center text-2xl font-sans text-zinc-500'>{status.field.name}</h1>
      <OnField field={props.field} match={status.onField} stage={status.stage} />
      <OnDeck field={props.field} match={status.onDeck} />
    </div>
  )
}
export function FieldInfos (): JSX.Element {
  const fields = FieldsSubscription()

  if (fields === undefined) {
    return <>Loading</>
  }

  const competitionFields = fields.filter((field) => field.isCompetition)

  const fieldControls = competitionFields.map((field) => {
    return (
      <FieldInfo field={field} key={field.id} />
    )
  })

  return (
    <div className='flex justify-center h-full mb-16'>{fieldControls}</div>
  )
}
