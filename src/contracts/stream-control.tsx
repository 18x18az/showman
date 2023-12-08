import { EmptyPost } from '../utils/maestro'

export async function pushScore (): Promise<void> {
  await EmptyPost('competitionControl/pushResult')
}

export const clearScoreUrl = 'competitionControl/clearResult'

export async function clearScore (): Promise<void> {
  await EmptyPost(clearScoreUrl)
}
