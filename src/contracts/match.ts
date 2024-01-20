import { Round } from '../__generated__/graphql'

export enum MatchStatus {
  NOT_STARTED = 'NOT_STARTED',
  QUEUED = 'QUEUED',
  SCORING = 'SCORING',
  NEEDS_REPLAY = 'NEEDS_REPLAY',
  COMPLETE = 'COMPLETE'
}

export interface Alliance {
  team1: string
  team2?: string
}

export interface Match {
  id: number
  block: string
  number: number
  red: Alliance
  blue: Alliance
  fieldId?: number
  fieldName?: string
  status: MatchStatus
  round: Round
  sitting: number
  time?: string
}
