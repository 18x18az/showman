import { SessionInfo } from '.'

const LOGIN_INFO_KEY = 'loginInfo'

export function loadLocalSession (): SessionInfo | null {
  const info = localStorage.getItem(LOGIN_INFO_KEY)
  if (info === null) {
    return null
  }
  return JSON.parse(info) as SessionInfo
}

export function saveSession (info: SessionInfo | null): void {
  if (info === null) {
    localStorage.removeItem(LOGIN_INFO_KEY)
    return
  }

  localStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(info))
}
