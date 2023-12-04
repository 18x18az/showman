import { Match } from './match'

export interface Field {
  id: number
  name: string
  isCompetition: boolean
  isSkills: boolean
}

export enum MATCH_STAGE {
  EMPTY = 'EMPTY',
  QUEUED = 'QUEUED',
  ON_DECK = 'ON_DECK',
  AUTON = 'AUTON',
  SCORING_AUTON = 'SCORING_AUTON',
  DRIVER = 'DRIVER',
  OUTRO = 'OUTRO',
  SCORING = 'SCORING'
}

export interface CompetitionFieldStatus {
  field: Field
  onDeck: Match | null
  onField: Match | null
  stage: MATCH_STAGE
}

export enum CONTROL_MODE {
  AUTO = 'AUTO',
  DRIVER = 'DRIVER',
}

export interface FieldControlStatus {
  mode: CONTROL_MODE
  endTime: string | null
}
