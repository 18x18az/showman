'use client'
import { EventStage, useGetEventStageQuery } from '@/__generated__/graphql'
import { CompetitionControl } from '@/views/ui/competition-control/main'
import Upload from './upload'
import { uploadTeams } from '@/contracts/teams'
import { uploadMatches } from '../../../contracts/matches'
import { uploadElims } from '../../../contracts/elims'

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
    return <Upload upload={uploadTeams} text='teams' />
  }

  if (stage === EventStage.Checkin) {
    return <Upload upload={uploadMatches} text='match' />
  }

  if (stage === EventStage.AllianceSelection) {
    return <Upload upload={uploadElims} text='elims match' />
  }

  return (
    <div>
      {data.stage.stage}
    </div>
  )
}
