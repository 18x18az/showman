'use client'
import UploadMatches from './upload-matches'
import { EventStage, useGetEventStageQuery } from '@/__generated__/graphql'
import { CompetitionControl } from '@/views/ui/competition-control/main'
import UploadTeams from './upload-teams'

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
    return <UploadTeams />
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
