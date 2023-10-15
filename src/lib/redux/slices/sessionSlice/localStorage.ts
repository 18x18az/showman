import { SessionSliceState } from '.'

const LOGIN_INFO_KEY = 'loginInfo'

export function loadLocalSession (): SessionSliceState {
  const info = localStorage.getItem(LOGIN_INFO_KEY)
  if (info === null) {
    return { needsUpdate: false }
  }
  return JSON.parse(info) as SessionSliceState
}

export function saveSession (info: SessionSliceState): void {
  localStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(info))
}
