'use client'
import { EventStage, useAllianceSelectionAcceptMutation, useAllianceSelectionCancelMutation, useAllianceSelectionControlQuery, useAllianceSelectionDeclineMutation, useAllianceSelectionPickMutation, useAllianceSelectionUndoMutation, useCanStartAllianceSelectionQuery, useStartAllianceSelectionMutation } from '../../../__generated__/graphql'
import { Button } from '../../../primitives/button/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog'

function AllianceSelectionControl (): JSX.Element {
  const { data } = useAllianceSelectionControlQuery({ pollInterval: 500 })
  const [pick] = useAllianceSelectionPickMutation({ refetchQueries: ['AllianceSelectionControl'] })
  const [accept] = useAllianceSelectionAcceptMutation({ refetchQueries: ['AllianceSelectionControl'] })
  const [decline] = useAllianceSelectionDeclineMutation({ refetchQueries: ['AllianceSelectionControl'] })
  const [undo] = useAllianceSelectionUndoMutation({ refetchQueries: ['AllianceSelectionControl'] })
  const [cancel] = useAllianceSelectionCancelMutation({ refetchQueries: ['AllianceSelectionControl'] })

  if (data === undefined) return <></>
  const status = data.allianceSelection
  if (status === null) return <></>

  const picking = status.picking?.number ?? ''
  const pickOptions = status.pickable.map((team) => {
    return <Button key={team.number} onClick={() => { void pick({ variables: { teamId: team.id } }) }}>{team.number}</Button>
  })

  const alliances = status.alliances.map((alliance) => {
    const teams = alliance.map((team) => {
      return <div key={team.number}>{team.number}</div>
    })
    return (
      <div key={alliance[0].id}>{teams}</div>
    )
  })

  const pickingTeamString = status.picking?.number ?? ''
  const pickedTeamString = status.picked?.number ?? ''

  return (
    <>
      <div className='flex justify-center'><h1 className='text-lg'>Alliance Selection</h1></div>
      <div className='flex justify-center text-2xl'><h2>{picking}</h2></div>
      <div className='grid grid-cols-4 gap-4'>{pickOptions}</div>
      <div><Button onClick={() => { void undo() }}>Undo</Button></div>
      <div className='grid grid-cols-4 gap-4'>{alliances}</div>

      <Dialog open={status.picked !== null} onOpenChange={(state: boolean) => { if (!state) void cancel() }}>
        <DialogContent>
          <DialogHeader><DialogTitle className='text-center mb-6'>{`Team ${pickingTeamString} has invited team ${pickedTeamString}`}</DialogTitle></DialogHeader>
          <div className='flex gap-4 justify-evenly'>
            <Button onClick={() => { void accept() }}>Accept</Button>
            <Button onClick={() => { void decline() }}>Decline</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function AllianceSelection (): JSX.Element {
  const { data } = useCanStartAllianceSelectionQuery({ pollInterval: 500 })
  const [startAllianceSelection] = useStartAllianceSelectionMutation({ refetchQueries: ['AllianceSelectionAdmin'] })

  if (data === undefined) return <></>

  const stage = data.stage.stage
  const inBlock = data.currentBlock !== null
  const hasNextBlock = data.nextBlock !== null

  if (stage === EventStage.AllianceSelection) {
    return <AllianceSelectionControl />
  }

  const canStartAllianceSelection = stage === EventStage.Qualifications && !inBlock && !hasNextBlock

  if (canStartAllianceSelection) {
    return (
      <div className='p-8'>
        <Button onClick={() => { void startAllianceSelection() }}>Begin Alliance Selection</Button>
      </div>
    )
  }

  return <></>
}
