import { Post } from '@/utils/maestro'

export async function setTmAddress (address: string): Promise<number> {
  return await Post('tm/setAddress', { address })
}
