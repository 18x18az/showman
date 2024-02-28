import { Post } from '@/utils/maestro'

export async function uploadElims (file: File): Promise<void> {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name)
  await Post('matches/elims', formData)
}
