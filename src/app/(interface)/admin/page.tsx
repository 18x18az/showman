'use client'
import { CompetitionControl } from '../../../components/views/competition-control/main'
import { AllianceSelectionControl } from '../alliance'
import TmSelector from './tm-connect'
import UploadMatches from '../upload'
import { EventStage, useGetEventStageQuery } from '../../../__generated__/graphql'

export default function Page (): JSX.Element {
  const { data } = useGetEventStageQuery(
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
