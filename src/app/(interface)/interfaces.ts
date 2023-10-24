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

export interface MatchIdentifier {
  round: number
  match: number
  sitting: number
}

export interface FieldStatus extends Field {
  state: FieldState
  time?: Date
  redAlliance?: Alliance
  blueAlliance?: Alliance
  match: MatchIdentifier
}
