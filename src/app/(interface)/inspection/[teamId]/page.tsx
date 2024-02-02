'use client'

import { ArrowBigLeft } from 'lucide-react'
import { Inspection, useInspectionDataQuery } from '@/__generated__/graphql'
import { InspectionChecklist } from '@/views/ui/inspection/inspection'
import Link from 'next/link'
import { Switch } from '@/primitives/switch/Switch'
import { useState } from 'react'

export default function Page ({ params }: { readonly params: { readonly teamId: string } }): JSX.Element {
  const { data } = useInspectionDataQuery({ variables: { teamId: parseInt(params.teamId) }, pollInterval: 500 })

  const [showAll, setShowAll] = useState(false)

  if (data === undefined) {
    return <div>Loading...</div>
  }

  const status = data.team.inspectionStatus

  if (status === Inspection.Completed) {
    return (
      <div className='flex flex-col items-center text-center gap-4'>
        <h1 className='text-4xl text-slate-12 mt-24'>{data.team.number}</h1>
        <h2 className='text-2xl text-slate-11'>Inspection Completed</h2>
        <Link href='/inspection'><ArrowBigLeft size={36} /></Link>
      </div>
    )
  }

  const team = data.team

  return (
    <>
      <div className='flex justify-center text-2xl mt-4 mb-2'>
        <div className='grow basis-0 px-4'>
          <Link href='/inspection' className='w-fit'><ArrowBigLeft /></Link>
        </div>
        <h1 className='grow basis-0 text-center'>{team.number}</h1>
        <div className='grow basis-0 flex justify-end items-center gap-2 px-4 text-sm'>
          <h1>Show All</h1>
          <Switch checked={showAll} onCheckedChange={(checked) => { setShowAll(checked) }} />
        </div>
      </div>
      <InspectionChecklist showAll={showAll} team={team} />
    </>
  )
}
