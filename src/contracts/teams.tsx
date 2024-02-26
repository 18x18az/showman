import { Post } from '@/utils/maestro'

export async function uploadTeams (file: File): Promise<void> {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name)
  await Post('teams', formData)
}
