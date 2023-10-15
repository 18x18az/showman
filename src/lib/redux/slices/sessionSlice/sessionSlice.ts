import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, SessionSliceState, UserInfo } from '.'
import { loadLocalSession, saveSession } from './localStorage'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: loadLocalSession(),
  reducers: {
    registered: (state: SessionSliceState, action: PayloadAction<LoginPayload>) => {
      if (state === null) {
        state = action.payload
      } else {
        state = { ...state, ...action.payload }
      }
      saveSession(state)
    },
    busUpdate: (state: SessionSliceState, action: PayloadAction<UserInfo>) => {
      if (state === null) {
        return
      }
      state = { ...state, ...action.payload }
      saveSession(state)
    },
    logout: (state: SessionSliceState) => {
      state = null
      saveSession(state)
    }
  }
})
