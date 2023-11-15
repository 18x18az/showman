'use client'

import { JsonTopic } from '@/utils/maestro'
import { Team } from '@18x18az/maestro-interfaces'
import { TeamTable } from './team-table'
import { Columns } from './columns'

type TeamInfo = Record<string, Team>

export function TeamList (): JSX.Element {
  const teams = JsonTopic<TeamInfo[]>('teams')

  if (teams === undefined) {
    return (
      <div>
        <div>Teams</div>
        <div>Teams are not yet configured.</div>
      </div>
    )
  }

  // const inspectionRollup = StringTopic('inspection/team/+', '')
  return (
    <div className='container mx-auto py-10' />
  )
}
