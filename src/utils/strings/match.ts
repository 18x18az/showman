import { Match } from '@/app/(interface)/interfaces'
import { Round } from '../../__generated__/graphql'

export function makeMatchName (match: Match): string {
  const round = match.round === Round.Ro16 ? 'Round of 16' : match.round === Round.QF ? 'Quarterfinals' : match.round === Round.SF ? 'Semifinals' : match.round === Round.F ? 'Finals' : ''

  const number = match.sitting > 0 ? `${match.number}-${match.sitting}` : `${match.number}`

  return `${round} ${number}`
}

interface MatchNameInfo {
  round: Round
  contest: number
  match: number
}

export function makeShortMatchName (info: MatchNameInfo): string {
  const round = info.round === Round.Ro16 ? 'R16' : info.round === Round.QF ? 'QF' : info.round === Round.SF ? 'SF' : info.round === Round.F ? 'F' : 'Q'
  const number = info.match > 1 ? `${info.contest}-${info.round}` : `${info.contest}`

  return `${round} ${number}`
}
