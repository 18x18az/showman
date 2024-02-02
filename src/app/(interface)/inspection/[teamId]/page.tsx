'use client'

import { ArrowBigLeft } from 'lucide-react'
import { useInspectionDataQuery } from '@/__generated__/graphql'
import { Inspection } from '@/views/ui/inspection/inspection'
import Link from 'next/link'
import { Switch } from '@/primitives/switch/Switch'
import { useState } from 'react'

export default function Page ({ params }: { readonly params: { readonly teamId: string } }): JSX.Element {
  const { data } = useInspectionDataQuery({ variables: { teamId: parseInt(params.teamId) }, pollInterval: 500 })

  const [showAll, setShowAll] = useState(false)

  if (data === undefined) {
    return <div>Loading...</div>
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
      <Inspection showAll={showAll} team={team} />
    </>
  )
}
