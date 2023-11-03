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

export interface Match {
  id: number
  round: Round
  matchNum: number
  sitting: number
  red: Alliance
  blue: Alliance
}

export enum ReplayStatus {
  NOT_STARTED = 'NOT_STARTED',
  ON_DECK = 'ON_DECK',
  AWAITING_SCORES = 'AWAITING_SCORES',
  RESOLVED = 'RESOLVED'
}


export interface ScheduledMatch extends Match {
  replayId: number
  fieldId: number
  fieldName: string
  replay: number
  time?: string
  status: ReplayStatus
}

export interface FieldStatus {
  field: Field
  state: FieldState
  match: ScheduledMatch | null
}

