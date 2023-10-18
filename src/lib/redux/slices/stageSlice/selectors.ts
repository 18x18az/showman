import type { ReduxState } from '@/lib/redux'
import { STAGE } from '.'

export function reduceMatch (stage: STAGE | null, match: STAGE): boolean | undefined {
  if (stage === null) {
    return
  }

  return stage === match
}

type Selector<T> = (state: ReduxState) => T

export const selectIsSetupStage: Selector<boolean | undefined> = (state: ReduxState) => reduceMatch(state.stage?.stage, STAGE.SETUP)
export const selectIsCheckinStage: Selector<boolean | undefined> = (state: ReduxState) => reduceMatch(state.stage?.stage, STAGE.CHECKIN)
export const selectIsEventStage: Selector<boolean | undefined> = (state: ReduxState) => reduceMatch(state.stage?.stage, STAGE.EVENT)
export const selectIsTearDownStage: Selector<boolean | undefined> = (state: ReduxState) => reduceMatch(state.stage?.stage, STAGE.TEARDOWN)
