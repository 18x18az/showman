'use client'

import { EventStage, useCanStartAllianceSelectionQuery } from '@/__generated__/graphql'
import { AllianceSelectionControl } from '@/views/ui/alliance-selection/alliance-selection'
import Upload from '../competition-control/upload'
import { uploadRankings } from '../../../contracts/rankings'

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
      <Upload upload={uploadRankings} text='rankings' />
    )
  }

  return <></>
}
