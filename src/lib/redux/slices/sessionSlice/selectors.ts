import { createSelector } from '@reduxjs/toolkit'
import type { ReduxState } from '@/lib/redux'

type Selector<T> = (state: ReduxState) => T

const selectUserId: Selector<number | undefined> = (state: ReduxState) => state.session?.userId
const selectToken: Selector<string | undefined> = (state: ReduxState) => state.session?.token

export const selectAuthentication = createSelector([selectUserId, selectToken], (userId, token) => {
  if (userId === undefined || token === undefined) {
    return null
  } else {
    return { id: userId, token }
  }
})

export const selectUserName: Selector<string | undefined> = (state: ReduxState) => state.session?.name
