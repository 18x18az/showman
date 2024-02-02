'use client'
import { EventStage, useGetEventStageQuery } from '../../../__generated__/graphql'
import { AllianceDisplay } from './alliance-display'
import { LogoFallback } from './fallback'
import { InspectionDisplay } from './inspection'
import { ParticlesBg } from './particles'
import { ResultDisplay } from './results'

function getContent (): JSX.Element {
  const { data } = useGetEventStageQuery({ pollInterval: 500 })

  if (data === undefined) return <LogoFallback />

  const stage = data.stage.stage

  if (stage === EventStage.Checkin) return <InspectionDisplay />
  if (stage === EventStage.Qualifications || stage === EventStage.Elims) return <ResultDisplay />
  if (stage === EventStage.AllianceSelection) return <AllianceDisplay />

  return <LogoFallback />
}

export default function Page (): JSX.Element {
  const content = getContent() ?? <LogoFallback />

  return (
    <div className='h-full w-full'>
      {content}
      <ParticlesBg />
    </div>
  )
}
