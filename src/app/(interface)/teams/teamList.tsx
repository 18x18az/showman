'use client'

import { TeamTable } from './team-table'
import { Columns } from './columns'
import { useTeamsQuery } from '../../../__generated__/graphql'

export function TeamList (): JSX.Element {
  const { data } = useTeamsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return <TeamTable columns={Columns} data={data.teams} />
}
