import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, SessionSliceState, UserInfo } from '.'
import { saveSession } from './localStorage'

const initialState: SessionSliceState = { needsUpdate: false }

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    registered: (state: SessionSliceState, action: PayloadAction<LoginPayload>) => {
      state = { ...state, ...action.payload, needsUpdate: false }
      saveSession(state)
      return state
    },
    busUpdate: (state: SessionSliceState, action: PayloadAction<UserInfo>) => {
      state = { ...state, ...action.payload, needsUpdate: false }
      saveSession(state)
      return state
    },
    logout: (state: SessionSliceState) => {
      state = { needsUpdate: true }
      saveSession(state)
      return state
    },
    markNeedsUpdate: (state: SessionSliceState, action: PayloadAction<boolean>) => {
      state = { ...state, needsUpdate: action.payload }
      return state
    },
    load: (state: SessionSliceState, action: PayloadAction<SessionSliceState>) => {
      state = { ...action.payload, needsUpdate: false }
      saveSession(state)
      return state
    }
  }
})
