import { SessionInfo } from '.'
import { EmptyPost } from '../../../../utils/maestro'

export async function register (): Promise<SessionInfo> {
  const response = await EmptyPost('auth/register')
  const responseJson = await response.json() as SessionInfo
  return responseJson
}
