import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EventStageState } from './interface'
import { STAGE } from '@18x18az/maestro-interfaces'

const initialState: EventStageState = {
  stage: null
}

export const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    updateStage: (state: EventStageState, action: PayloadAction<STAGE>) => {
      state.stage = action.payload
      return state
    }
  }

})
