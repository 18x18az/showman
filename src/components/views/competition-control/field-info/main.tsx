import { OnDeck } from './on-deck'
import { OnField } from './on-field'
import { gql } from '../../../../__generated__'
import { useQuery } from '@apollo/client'
import { MatchStage, SittingInformationFragment } from '../../../../__generated__/graphql'
import { MatchIdentifier } from './interfaces'

interface FieldInfoProps {
  name: string
  stage: MatchStage
  id: number
  field: MatchIdentifier | null
  table: MatchIdentifier | null
}

function FieldInfo (props: FieldInfoProps): JSX.Element {
  return (
    <div className='flex flex-col gap-8 w-96 mb-8 items-center justify-center h-full'>
      <h1 className='text-center text-2xl font-sans text-zinc-500'>{props.name}</h1>
      <OnField fieldId={props.id} stage={props.stage} match={props.field} />
      <OnDeck field={props.id} match={props.table} />
    </div>
  )
}

gql(`
  fragment SittingInformation on Sitting {
    id
    contest {
      round
      number
    }
    match {
      number
    }
  }
`)

const GET_COMPETITION_FIELDS = gql(`
  query GetCompetitionFields {
    fields(isEnabled: true, isCompetition: true) {
      id
      name
      competition {
        stage
        onFieldSitting {
          ...SittingInformation
        }
        onTableSitting {
          ...SittingInformation
        }
      }
      fieldControl {
        endTime
      }
    }
  }
`)

function makeIdentifier (sitting: SittingInformationFragment | null): MatchIdentifier | null {
  if (sitting === null) return null

  return {
    id: sitting.id,
    round: sitting.contest.round,
    contest: sitting.contest.number,
    match: sitting.match.number
  }
}

export function FieldInfos (): JSX.Element {
  const { data } = useQuery(
    GET_COMPETITION_FIELDS,
    {
      pollInterval: 500
    }
  )

  if (data === undefined) {
    return <>Loading</>
  }

  const fields = data.fields

  const fieldControls = fields.map((field) => {
    const compInfo = field.competition

    const stage = compInfo === null ? MatchStage.Empty : compInfo.stage
    const onField = compInfo === null ? null : makeIdentifier(compInfo.onFieldSitting)
    const onTable = compInfo === null ? null : makeIdentifier(compInfo.onTableSitting)

    return (
      <FieldInfo stage={stage} id={field.id} name={field.name} key={field.id} field={onField} table={onTable} />
    )
  })

  return (
    <div className='flex justify-center h-full mb-16'>{fieldControls}</div>
  )
}
