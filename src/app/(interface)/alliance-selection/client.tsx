'use client'

import { EventStage, useCanStartAllianceSelectionQuery, useStartAllianceSelectionMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { AllianceSelectionControl } from '@/views/ui/alliance-selection/alliance-selection'

export function AllianceSelection (): JSX.Element {
  const { data } = useCanStartAllianceSelectionQuery({ pollInterval: 500 })

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
        <ErrorableButton mutation={useStartAllianceSelectionMutation} options={{ refetchQueries: ['AllianceSelectionAdmin'] }}>Begin Alliance Selection</ErrorableButton>
      </div>
    )
  }

  return <></>
}
