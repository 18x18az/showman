import { Post } from "@/utils/maestro";

export async function setTmAddress (address: string): Promise<number> {
  return Post('tm/setAddress', { address })
}
