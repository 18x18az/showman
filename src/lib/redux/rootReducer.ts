import { sessionSlice, stageSlice } from './slices'

export const reducer = {
  session: sessionSlice.reducer,
  stage: stageSlice.reducer
}
