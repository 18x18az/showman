'use client'

import { JsonTopic, StringTopic } from '@/utils/maestro'
import { Team } from '@18x18az/maestro-interfaces'
import { DataTable } from './data-table'
import { Columns } from './columns'

type TeamInfo = Record<string, Team>

export function TeamList() {
    const teamList = Object.values(JsonTopic<TeamInfo>('teams', {}))
    const inspectionRollup = StringTopic('inspection/team/+', '')
    return <div className='container mx-auto py-10'>
      <DataTable columns={Columns} data={teamList} />
    </div>
}
