import { Round } from '../../../../__generated__/graphql'

export interface FieldInfo {
  id: number
  name: string
}

export interface MatchIdentifier {
  id: number
  round: Round
  contest: number
  match: number
}

export type SelectedField = number | null
