'use client'
import { MatchDisplay } from './match'
import { AllianceSelection } from './alliance'
import { EventStage, useGetEventStageQuery } from '../../../__generated__/graphql'

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {
  const { data } = useGetEventStageQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  const stage = data.stage.stage

  if (stage === EventStage.Qualifications || stage === EventStage.Elims) {
    return <MatchDisplay />
  } else if (stage === EventStage.AllianceSelection) {
    return <AllianceSelection />
  }
  return <></>
}
