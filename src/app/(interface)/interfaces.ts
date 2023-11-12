export enum FieldState {
  IDLE = 'IDLE',
  ON_DECK = 'ON_DECK',
  AUTO = 'AUTO',
  PAUSED = 'PAUSED',
  DRIVER = 'DRIVER',
  SCORING = 'SCORING',
  PROG_SKILLS = 'PROG_SKILLS',
  DRIVER_SKILLS = 'DRIVER_SKILLS',
}

export interface Field {
  id: number
  name: string
}

export interface Alliance {
  team1: string
  team2?: string
}

export enum Round {
  QUAL = 'qual',
  Ro16 = 'ro16',
  QF = 'qf',
  SF = 'sf',
  F = 'f'
}

export enum MatchStatus {
  NOT_STARTED = 'NOT_STARTED',
  QUEUED = 'QUEUED',
  SCORING = 'SCORING',
  NEEDS_REPLAY = 'NEEDS_REPLAY',
  COMPLETE = 'COMPLETE'
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

export enum ReplayStatus {
  NOT_STARTED = 'NOT_STARTED',
  ON_DECK = 'ON_DECK',
  AWAITING_SCORES = 'AWAITING_SCORES',
  RESOLVED = 'RESOLVED'
}

export interface FieldStatus {
  field: Field
  state: FieldState
  match: Match | null
  onDeck: Match | null
  endTime: string | null
}
