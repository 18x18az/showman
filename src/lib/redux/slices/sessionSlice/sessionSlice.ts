import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, SessionSliceState, UserInfo } from '.'
import { saveSession } from './localStorage'

const initialState: SessionSliceState = { }

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    registered: (state: SessionSliceState, action: PayloadAction<LoginPayload>) => {
      state = { ...state, ...action.payload }
      saveSession(state)
      return state
    },
    busUpdate: (state: SessionSliceState, action: PayloadAction<UserInfo>) => {
      state = { ...state, ...action.payload }
      saveSession(state)
      return state
    },
    logout: () => {
      saveSession({})
      return {}
    },
    load: (_: SessionSliceState, action: PayloadAction<SessionSliceState>) => {
      const state = { ...action.payload, needsUpdate: false }
      saveSession(state)
      return state
    }
  }
})
