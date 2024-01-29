import { Round } from '@/__generated__/graphql'

export interface FieldInfo {
  readonly id: number
  readonly name: string
}

export interface SittingIdentifier {
  readonly id: number
  readonly round: Round
  readonly contest: number
  readonly match: number
}

export type SelectedField = number | null
