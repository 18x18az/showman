import { ThunkDispatch } from 'redux-thunk'
import { loadLocalSession } from './localStorage'
import { sessionSlice } from '.'
import { Post } from '@/utils/maestro'

export async function hydrateSession (dispatch: ThunkDispatch<{}, {}, any>): Promise<boolean> {
  const local = loadLocalSession()

  if (local.token === undefined || local.userId === undefined) {
    return false
  }
  dispatch(sessionSlice.actions.load(local))
  const validationResponse = await Post('auth/login', { id: local.userId, token: local.token })
  const validationResult = await validationResponse.json() as boolean

  if (!validationResult) {
    dispatch(sessionSlice.actions.logout())
    return false
  }

  return true
}
