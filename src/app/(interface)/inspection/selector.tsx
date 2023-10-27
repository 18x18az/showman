'use client'

import { JsonTopic } from '@/utils/maestro'

interface InspectionStage {
  teams: string[]
}

export function InspectionSelector (): JSX.Element {
  const checkedIn = JsonTopic<InspectionStage>('inspection/stage/CHECKED_IN', { teams: [] })
  const partial = JsonTopic<InspectionStage>('inspection/stage/PARTIAL', { teams: [] })
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const allTeams = [...checkedIn.teams, ...partial.teams].sort(function (a, b) { return a.length - b.length || a.localeCompare(b) })

  const teamLinks = allTeams.map((team) => {
    return <div key={team} className='text-3xl bg-zinc-900 m-2 p-2 w-44 text-center rounded-md'><a href={`/inspection/${team}`}>{team}</a></div>
  })

  return <div className='grid grid-cols-2 xl:grid-cols-4 width-full justify-evenly justify-items-center'>{teamLinks}</div>
}
