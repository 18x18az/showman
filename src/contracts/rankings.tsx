import { Post } from '@/utils/maestro'

export async function uploadRankings (file: File): Promise<void> {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name)
  await Post('rankings', formData)
}
