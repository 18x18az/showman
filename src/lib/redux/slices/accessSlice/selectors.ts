import { createSelector } from '@reduxjs/toolkit'
import { selectIsAdmin, selectIsCheckin, selectIsReferee } from '..'
import { selectIsCheckinStage, selectIsSetupStage } from '../stageSlice/selectors'

export const selectCanAccessInspection = createSelector([selectIsSetupStage, selectIsReferee, selectIsAdmin], (isSetup, isReferee, isAdmin) => {
  if (isReferee === undefined || isAdmin === undefined || isSetup === undefined) {
    return undefined
  }

  if (isSetup) {
    return false
  }

  if (!isReferee && !isAdmin) {
    return false
  }

  return true
})

export const selectCanAccessCheckin = createSelector([selectIsCheckinStage, selectIsCheckin, selectIsAdmin], (isInCheckin, isCheckin, isAdmin) => {
  if (isCheckin === undefined || isAdmin === undefined || isInCheckin === undefined) {
    return undefined
  }

  if (!isInCheckin) {
    return false
  }

  if (!isCheckin && !isAdmin) {
    return false
  }

  return true
})

export const selectCanAccessDevices = createSelector([selectIsAdmin], (isAdmin) => {
  if (isAdmin === undefined) {
    return undefined
  }

  return isAdmin
})
