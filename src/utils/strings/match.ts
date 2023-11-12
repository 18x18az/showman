import { Match, Round } from '@/app/(interface)/interfaces'

export function makeMatchName (match: Match): string {
  const round = match.round === Round.Ro16 ? 'Round of 16' : match.round === Round.QF ? 'Quarterfinals' : match.round === Round.SF ? 'Semifinals' : match.round === Round.F ? 'Finals' : ''

  const number = match.sitting > 0 ? `${match.number}-${match.sitting}` : `${match.number}`

  return `${round} ${number}`
}

export function makeShortMatchName (match: Match): string {
  const round = match.round === Round.Ro16 ? 'R16' : match.round === Round.QF ? 'QF' : match.round === Round.SF ? 'SF' : match.round === Round.F ? 'F' : 'Q'
  const number = match.sitting > 0 ? `${match.number}-${match.sitting}` : `${match.number}`

  return `${round} ${number}`
}
