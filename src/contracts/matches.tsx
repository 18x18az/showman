import { JsonTopic, Post } from '@/utils/maestro'
import { Match } from './match'

export async function uploadMatches (file: File): Promise<void> {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name)
  await Post('matches/quals', formData)
}

export const UnqueuedMatchesSubscription = (): Match[] | undefined => {
  return JsonTopic<Match[]>('unqueued')
}
