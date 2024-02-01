'use client'

import Link from 'next/link'
import { useInspectableTeamsQuery } from '../../../__generated__/graphql'

interface Team {
  id: number
  number: string
}

export function InspectionSelector (): JSX.Element {
  const { data } = useInspectableTeamsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <></>
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const allTeams: Team[] = [...data.inProgress, ...data.notStarted].sort(function (a, b) { return a.number.length - b.number.length || a.number.localeCompare(b.number) })

  const teamLinks = allTeams.map((team) => {
    return <Link className='bg-slate-3 text-3xl m-2 p-2 w-44 text-center rounded-md text-slate-12' key={team.id} href={`/inspection/${team.id}`}>{team.number}</Link>
  })

  return <div className='grid grid-cols-2 xl:grid-cols-4 width-full justify-evenly justify-items-center'>{teamLinks}</div>
}
