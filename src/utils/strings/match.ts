import { Round, SittingInformationFragment } from '../../__generated__/graphql'

export function shortRoundName (round: Round): string {
  return round === Round.Ro16 ? 'R16' : round === Round.Qf ? 'QF' : round === Round.Sf ? 'SF' : round === Round.F ? 'F' : 'Q'
}

export function roundName (round: Round): string {
  return round === Round.Ro16 ? 'Round of 16' : round === Round.Qf ? 'Quarterfinals' : round === Round.Sf ? 'Semifinals' : round === Round.F ? 'Finals' : 'Qualification'
}

export function makeMatchName (sitting: SittingInformationFragment): string {
  const round = sitting.contest.round
  const contest = sitting.contest.number
  const match = sitting.match.number

  const replay = sitting.number - 1

  const roundString = roundName(round)
  const numberString = match > 1 ? `${contest}-${match}` : `${contest}`
  const replayString = replay > 0 ? ' Replay' : ''

  return `${roundString} Match ${numberString}${replayString}`
}

export function makeShortMatchName (sitting: SittingInformationFragment): string {
  const round = sitting.contest.round
  const contest = sitting.contest.number
  const match = sitting.match.number

  const replay = sitting.number - 1

  const roundString = shortRoundName(round)
  const numberString = match > 1 ? `${contest}-${match}` : `${contest}`
  const replayString = replay > 0 ? 'R ' : ''

  return `${replayString}${roundString} ${numberString}`
}
