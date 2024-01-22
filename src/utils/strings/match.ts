import { Round, SittingInformationFragment } from '../../__generated__/graphql'

export function makeMatchName (sitting: SittingInformationFragment): string {
  const round = sitting.contest.round
  const contest = sitting.contest.number
  const match = sitting.match.number

  const roundString = round === Round.Ro16 ? 'Round of 16' : round === Round.Qf ? 'Quarterfinals' : round === Round.Sf ? 'Semifinals' : round === Round.F ? 'Finals' : ''
  const number = match > 1 ? `${contest}-${match}` : `${contest}`

  return `${roundString} ${number}`
}

export function makeShortMatchName (sitting: SittingInformationFragment): string {
  const round = sitting.contest.round
  const contest = sitting.contest.number
  const match = sitting.match.number

  const roundString = round === Round.Ro16 ? 'R16' : round === Round.Qf ? 'QF' : round === Round.Sf ? 'SF' : round === Round.F ? 'F' : 'Q'
  const number = match > 1 ? `${contest}-${match}` : `${contest}`

  return `${roundString} ${number}`
}
