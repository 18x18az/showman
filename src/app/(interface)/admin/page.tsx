'use client'
import { useQuery } from '@apollo/client'

import { gql } from '../../../__generated__/gql'
import { EventStage } from '../../../__generated__/graphql'
import { CompetitionControl } from '../../../components/views/competition-control/main'
import { AllianceSelectionControl } from '../alliance'
import TmSelector from './tm-connect'
import UploadMatches from '../upload'

const GET_EVENT_STAGE = gql(/* GraphQL */ `
  query GetEventStage {
    stage {
      stage
    }
  }
`)

export default function Page (): JSX.Element {
  const { data } = useQuery(
    GET_EVENT_STAGE,
    {
      pollInterval: 500
    }
  )

  if (data === undefined) {
    return <>Loading</>
  }

  const stage = data.stage.stage

  if (stage === EventStage.Qualifications || stage === EventStage.Elims) {
    return <CompetitionControl />
  }

  if (stage === EventStage.AllianceSelection) {
    return <AllianceSelectionControl />
  }

  if (stage === EventStage.WaitingForTeams) {
    return <TmSelector />
  }

  if (stage === EventStage.Checkin) {
    return <UploadMatches />
  }

  return (
    <div>
      {data.stage.stage}
    </div>
  )
}
