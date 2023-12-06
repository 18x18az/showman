import { EmptyPost } from '../utils/maestro'

export async function pushScore (): Promise<void> {
  await EmptyPost('stream/pushScore')
}

export const clearScoreUrl = 'stream/clearScore'

export async function clearScore (): Promise<void> {
  await EmptyPost(clearScoreUrl)
}
