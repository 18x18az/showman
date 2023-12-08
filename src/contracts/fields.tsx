import { JsonTopic } from '../utils/maestro'
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
  duration: number | null
}

export type SelectedField = number | null | undefined
interface FieldSelection {
  fieldId: number | null
}

export const LiveFieldSubscription = (): SelectedField => {
  const results = JsonTopic<FieldSelection>('liveField')
  if (results === undefined) {
    return undefined
  } else {
    return results.fieldId
  }
}

export const OnDeckFieldSubscription = (): SelectedField => {
  const results = JsonTopic<FieldSelection>('onDeckField')
  if (results === undefined) {
    return undefined
  } else {
    return results.fieldId
  }
}

export const FieldsSubscription = (): Field[] | undefined => {
  return JsonTopic<Field[]>('fields')
}

export const CompetitionFieldStatusSubscription = (fieldId: number): CompetitionFieldStatus | undefined => {
  return JsonTopic<CompetitionFieldStatus>(`competitionField/${fieldId}`)
}

export const QueueableFieldsSubscription = (): Field[] | undefined => {
  return JsonTopic<Field[]>('competitionFields/queueable')
}

export const VacantFieldsSubscription = (): Field[] | undefined => {
  return JsonTopic<Field[]>('competitionFields/vacant')
}

export const FieldControlSubscription = (fieldId: number): FieldControlStatus | undefined => {
  return JsonTopic<FieldControlStatus>(`fieldControl/${fieldId}`) ?? undefined
}
