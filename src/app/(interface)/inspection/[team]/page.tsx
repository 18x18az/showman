'use client'

import { Inspection } from '@/components/objects/inspection/Inspection'
import { Header } from '@/components/primitives/Header'
import { Switch } from '@/components/ui/switch'
import { JsonTopic, Post, StringTopic } from '@/utils/maestro'
import { InspectionSectionDataBroadcast } from '@18x18az/maestro-interfaces'
import { ArrowBigLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function Page ({ params }: { readonly params: { readonly team: string } }): JSX.Element {
  const progress = JsonTopic<InspectionSectionDataBroadcast[]>(`inspection/team/${params.team}/inspection`, [])
  const summary = StringTopic<string>(`inspection/team/${params.team}`, '')

  if (summary === 'COMPLETE') {
    redirect('/inspection')
  }

  const [hideComplete, setHideComplete] = useState(true)

  if (progress === undefined) {
    return <div>Loading...</div>
  }

  function onChange (uuid: number, state: boolean): void {
    const uri = `inspection/${params.team}/criteria/${uuid}`
    void Post(uri, { met: state })
  }

  return (
    <>
      <Header name='Inspection' description={`Team ${params.team}`} />
      <div className='m-2 flex justify-between'>
        <a href='/inspection'><ArrowBigLeft /></a>
        <div className='flex gap-2'>Hide Met<Switch checked={hideComplete} onCheckedChange={setHideComplete} /></div>
      </div>

      <Inspection hideComplete={hideComplete} sections={progress} onChange={onChange} />
    </>
  )
}
