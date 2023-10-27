'use client'

import { JsonTopic } from '@/utils/maestro'
import { Team } from '@18x18az/maestro-interfaces'
import { TeamTable } from './team-table'
import { Columns } from './columns'

type TeamInfo = Record<string, Team>

export function TeamList (): JSX.Element {
  const teamList = Object.values(JsonTopic<TeamInfo>('teams', {}))
  // const inspectionRollup = StringTopic('inspection/team/+', '')
  return (
    <div className='container mx-auto py-10'>
      <TeamTable columns={Columns} data={teamList} />
    </div>
  )
}
