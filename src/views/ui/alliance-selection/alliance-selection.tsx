'use client'
import { useAllianceSelectionAcceptMutation, useAllianceSelectionCancelMutation, useAllianceSelectionControlQuery, useAllianceSelectionDeclineMutation, useAllianceSelectionFinalizeMutation, useAllianceSelectionPickMutation, useAllianceSelectionUndoMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Upload from '@/app/(interface)/competition-control/upload'
import { uploadRankings } from '@/contracts/rankings'

export function AllianceSelectionControl (): JSX.Element {
  const { data } = useAllianceSelectionControlQuery({ pollInterval: 500 })
  const [cancel] = useAllianceSelectionCancelMutation({ refetchQueries: ['AllianceSelectionControl'] })

  if (data === undefined) return <></>
  const status = data.allianceSelection

  if (status === null) return <Upload upload={uploadRankings} text='rankings' />

  const picking = status.picking?.number ?? ''
  const pickOptions = status.pickable.map((team) => {
    return (
      <ErrorableButton
        mutation={useAllianceSelectionPickMutation}
        options={{ variables: { teamId: team.id }, refetchQueries: ['AllianceSelectionControl'] }}
        key={team.id}
      >
        {team.number}
      </ErrorableButton>
    )
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

  let finalizeButton = <></>

  if (status.picking === null) {
    finalizeButton = <ErrorableButton mutation={useAllianceSelectionFinalizeMutation} options={{ refetchQueries: ['AllianceSelectionControl'] }}>Finalize</ErrorableButton>
  }

  return (
    <>
      <div className='flex justify-center'><h1 className='text-lg'>Alliance Selection</h1></div>
      <div className='flex justify-center text-2xl'><h2>{picking}</h2></div>
      <div className='grid grid-cols-4 gap-4'>{pickOptions}</div>
      <div className='flex gap-4 m-4'>
        <ErrorableButton mutation={useAllianceSelectionUndoMutation} options={{ refetchQueries: ['AllianceSelectionControl'] }}>
          Undo
        </ErrorableButton>
        {finalizeButton}
      </div>
      <div className='grid grid-cols-4 gap-4'>{alliances}</div>

      <Dialog open={status.picked !== null} onOpenChange={(state: boolean) => { if (!state) void cancel() }}>
        <DialogContent>
          <DialogHeader><DialogTitle className='text-center mb-6'>{`Team ${pickingTeamString} has invited team ${pickedTeamString}`}</DialogTitle></DialogHeader>
          <div className='flex gap-4 justify-evenly'>
            <ErrorableButton mutation={useAllianceSelectionAcceptMutation} options={{ refetchQueries: ['AllianceSelectionControl'] }}>Accept</ErrorableButton>
            <ErrorableButton mutation={useAllianceSelectionDeclineMutation} options={{ refetchQueries: ['AllianceSelectionControl'] }}>Decline</ErrorableButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
