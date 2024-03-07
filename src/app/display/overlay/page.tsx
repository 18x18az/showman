'use client'
import { MatchDisplay } from './match'
import { AllianceSelection } from './alliance'
import { EventStage, OverlayDisplayed, useGetOverlayDisplayControlQuery } from '../../../__generated__/graphql'
import { AwardOverlay } from './award'

export default function Page ({ params }: { readonly params: { readonly field: string } }): JSX.Element {
  const { data } = useGetOverlayDisplayControlQuery({ pollInterval: 250 })

  if (data === undefined) return <></>

  const stage = data.stage.stage
  const displayed = data.overlay.displayed

  if (displayed === OverlayDisplayed.None) return <></>
  if (displayed === OverlayDisplayed.Card) return <AwardOverlay award={data.overlay.award} />

  if (stage === EventStage.Qualifications || stage === EventStage.Elims) {
    return <MatchDisplay />
  } else if (stage === EventStage.AllianceSelection) {
    return <AllianceSelection />
  }
  return <></>
}
