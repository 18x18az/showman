'use client'

import { useState } from 'react'
import { Inspection, useGetNotCheckedInTeamsQuery, useMarkCheckinMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Dropdown } from '@/primitives/dropdown/Dropdown'

export function Checkin (): JSX.Element {
  const { data } = useGetNotCheckedInTeamsQuery({ pollInterval: 500 })

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  if (data === undefined) {
    return <>Loading</>
  }

  const options = data.teams.map((team) => {
    return team.number
  })

  if (options.length === 0) {
    return <div className='w-full flex justify-center mt-8 text-6xl'>All teams have been checked in</div>
  }

  const selectedInfo = data.teams.find((team) => team.number === selectedTeam)

  let content = <></>

  if (selectedInfo !== undefined) {
    content = (
      <div className='w-full text-center gap-4 flex-col flex items-center'>
        <div className='text-6xl text-slate-12'>{selectedInfo.number}</div>
        <div className='text-4xl text-slate-11 mb-4'>{selectedInfo.name}</div>
        <ErrorableButton
          size='lg'
          mutation={useMarkCheckinMutation}
          options={{ variables: { teamId: selectedInfo.id, status: Inspection.CheckedIn }, refetchQueries: ['GetNotCheckedInTeams'] }}
        >
          Check In
        </ErrorableButton>
      </div>
    )
  }

  return (
    <div className='w-full flex justify-center mt-8'>
      <div className='flex flex-col w-full items-center gap-8'>
        <Dropdown size='L' options={options} value={selectedTeam ?? ''} onChange={(team: string) => { setSelectedTeam(team) }} />
        {content}
      </div>
    </div>
  )
}
