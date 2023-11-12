'use client'

import RestButton from '@/components/ui/rest-button'
import { JsonTopic } from '@/utils/maestro'
import { FieldControl } from './field-control'
import { FieldStatus } from '../interfaces'
import { Queueing } from './queueing'
import { Settings } from './settings'
import { MatchControl } from './match-control'

export function CompetitionControl (): JSX.Element {
  const block = JsonTopic<{ block: string | null }>('block')
  const activeField = JsonTopic<FieldStatus | null>('activeField')
  const nextField = JsonTopic<FieldStatus | null>('nextField')

  if (block === undefined || activeField === undefined || nextField === undefined) {
    return <>No block</>
  }

  if (block.block === null) {
    return <div><RestButton url='matches/proceed' text='Queue Next Block' pendingText='Loading...' className='w-48' /></div>
  }

  return (
    <div className='flex w-full p-8 gap-8 h-screen'>
      <div className='p-6 rounded-lg flex-1'><FieldControl activeField={activeField} nextField={nextField} /></div>
      <div className='flex flex-col gap-8'>
        <div className='border border-zinc-800 p-8 rounded-xl'><MatchControl active={activeField} /></div>
        <div className='border border-zinc-800 p-8 rounded-xl'><Queueing active={activeField} next={nextField} /></div>
        <div className='border border-zinc-800 p-8 rounded-xl'><Settings /></div>
      </div>
    </div>
  )
}
