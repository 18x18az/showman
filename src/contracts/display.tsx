import { JsonTopic } from '../utils/maestro'

export enum DisplayState {
  UNKNOWN = 'UNKNOWN',
  MATCH = 'MATCH',
  RESULTS = 'RESULTS',
  TRANSITIONING = 'TRANSITIONING',
}

export const DisplayStageSubscription = (): DisplayState | undefined => {
  return JsonTopic<{ stage: DisplayState }>('displayStage')?.stage
}
