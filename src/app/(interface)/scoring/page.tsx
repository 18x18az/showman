'use client'

import { useState } from 'react'
import { useCompetitionFieldsQuery, useFieldWorkingScoreQuery } from '../../../__generated__/graphql'
import { Dropdown } from '../../../primitives/dropdown/Dropdown'
import { MatchScore } from '../../../components/objects/scoring/MatchScore'
import { makeShortMatchName } from '../../../utils/strings/match'

interface MatchScoreWrapperProps {
  readonly fieldId: number
}

function MatchScoreWrapper (props: MatchScoreWrapperProps): JSX.Element {
  const { data } = useFieldWorkingScoreQuery({ pollInterval: 500, variables: { fieldId: props.fieldId } })

  if (data === undefined) {
    return <>Loading...</>
  }

  const sitting = data.field.competition?.onFieldSitting
  const match = sitting?.match

  if (match === undefined || sitting === undefined || sitting === null) {
    return <>No match</>
  }

  return (
    <div className='w-full desktop:p-10'>
      <h1 className='w-full text-center text-slate-11 text-2xl'>{makeShortMatchName(sitting)}</h1>
      <MatchScore matchId={match.id} />
    </div>
  )
}
interface ScoringMenuProps {
  readonly fields: Array<{ id: number, name: string }>
}

function ScoringMenu (props: ScoringMenuProps): JSX.Element {
  const fieldOptions = props.fields.map((field) => field.name)
  const [field, setField] = useState(fieldOptions[0])
  const fullField = props.fields.find(option => { return option.name === field })
  if (fullField === undefined) return <></>

  return (
    <div className='w-full h-dvh flex flex-col items-center py-8'>
      <MatchScoreWrapper fieldId={fullField.id} />
      <Dropdown size='S' options={fieldOptions} value={field} onChange={setField} />
    </div>
  )
}

export default function Page (): JSX.Element {
  const { data } = useCompetitionFieldsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <>Loading</>
  }

  const skillsFields = data.fields

  return <ScoringMenu fields={skillsFields} />
}
