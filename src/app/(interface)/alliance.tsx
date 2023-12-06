'use client'

import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog'
import { EmptyPost, JsonTopic, Post } from '@/utils/maestro'

export interface AllianceSelectionStatus {
  picking: string | null
  picked: string | null
  pickable: string[]
  alliances: Array<[string, string]>
  remaining: string[]
}

export function AllianceSelectionControl (): JSX.Element {
  const status = JsonTopic<AllianceSelectionStatus | null>('allianceSelection')

  if (status === undefined || status === null) return <></>

  const pickOptions = status.pickable.map((team) => <Button key={team} onClick={() => void Post('allianceSelection/pick', { team })}>{team}</Button>)

  const alliances = status.alliances.map((alliance, index) => <div key={alliance[0]}>{index + 1}: {alliance[0]} {alliance[1]}</div>)

  return (
    <>
      <div className='flex justify-center'><h1 className='text-lg'>Alliance Selection</h1></div>
      <div className='flex justify-center text-2xl'><h2>{status.picking}</h2></div>
      <div className='grid grid-cols-4 gap-4'>{pickOptions}</div>
      <div><Button onClick={() => { void EmptyPost('allianceSelection/undo') }}>Undo</Button></div>
      <div className='grid grid-cols-4 gap-4'>{alliances}</div>
      <Dialog open={status.picked !== null} onOpenChange={(state: boolean) => { if (!state) void EmptyPost('allianceSelection/cancel') }}>
        <DialogContent>
          <DialogHeader><DialogTitle className='text-center mb-6'>{`Team ${status.picking} has invited team ${status.picked}`}</DialogTitle></DialogHeader>
          <div className='flex gap-4 justify-evenly'>
            <Button onClick={() => { void EmptyPost('allianceSelection/accept') }}>Accept</Button>
            <Button onClick={() => { void EmptyPost('allianceSelection/decline') }}>Decline</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
