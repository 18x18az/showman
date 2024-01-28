'use client'
import TmSelector from './tm-connect'
import UploadMatches from '../upload'
import { EventStage, useGetEventStageQuery } from '../../../__generated__/graphql'
import { CompetitionControl } from '../../../views/competition-control/main'

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
