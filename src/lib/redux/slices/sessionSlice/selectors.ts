import { createSelector } from '@reduxjs/toolkit'
import type { ReduxState } from '@/lib/redux'
import { ROLE } from '@18x18az/maestro-interfaces'

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
export const selectRole: Selector<ROLE | undefined> = (state: ReduxState) => state.session?.role

export const selectIsAdmin: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role === ROLE.ADMIN)
export const selectIsEmcee: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role === ROLE.EMCEE)
export const selectIsUnassigned: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role === ROLE.NONE)
export const selectIsAssigned: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role !== ROLE.NONE)
export const selectIsReferee: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role === ROLE.REFEREE)
export const selectIsCheckin: Selector<boolean | undefined> = createSelector([selectRole], (role) => role === undefined ? undefined : role === ROLE.CHECKIN)
