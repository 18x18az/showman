'use client'

import { useState } from 'react'
import { Dropdown } from '@/components/primitives/Dropdown'
import { EmptyPost, JsonTopic } from '@/utils/maestro'
import { accessRedirect } from '@/utils/AccessRedirect'
import { selectCanAccessCheckin } from '@/lib/redux'

interface ExpectedResult {
  teams: string[] | undefined
}

async function clickHandler (team: string | undefined): Promise<void> {
  if (team === undefined) {
    return
  }

  const resource = `inspection/${team}/checkedIn`
  await EmptyPost(resource)
}

export default function CheckInBody (): JSX.Element | null {
  accessRedirect(selectCanAccessCheckin)
  const notCheckedIn: string[] | undefined = JsonTopic<ExpectedResult>('inspection/stage/NOT_HERE', { teams: undefined }).teams

  const [selected, setSelected] = useState<string | undefined>(undefined)

  if (notCheckedIn === undefined) {
    return <></>
  }

  if (notCheckedIn.length === 0) {
    return (
      <div className='fixed text-center w-full mt-48'>
        <h1 className='text-indigo-9 text-6xl mb-6'>Team Check-In Complete</h1>
        <h2 className='text-slate-12 text-4xl'>Please return device to tech operator</h2>
      </div>
    )
  }

  if (selected === undefined || !(notCheckedIn.some(value => value === selected))) {
    setSelected(notCheckedIn[0])
  }

  return (
    <div className='flex flex-col text-center fixed w-full mt-24 gap-8 items-center'>
      <h1 className='text-6xl text-slate-12 mb-6 text-slate-12'>Team Check-In</h1>
      <Dropdown size='L' value={selected ?? ''} options={notCheckedIn} onChange={(value: string) => { setSelected(value) }} />
      <button onClick={() => { void clickHandler(selected) }} className='text-indigo-12 text-2xl bg-indigo-5 hover:bg-indigo-6 w-fit p-4 rounded-md'>Check In</button>
    </div>
  )
}
