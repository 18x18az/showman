import type { ReduxState } from '@/lib/redux'

interface SessionInfo {
  id: number
  token: string
}

type Selector<T> = (state: ReduxState) => T

export const selectAuthentication: Selector<SessionInfo | null> = (state: ReduxState) => {
  if (state.session === null) {
    return null
  } else {
    return { id: state.session.userId, token: state.session.token }
  }
}
export const selectUserName: Selector<string | undefined> = (state: ReduxState) => state.session?.name
