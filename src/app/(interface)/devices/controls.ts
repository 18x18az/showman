import { ROLE } from '@18x18az/maestro-interfaces'
import { Delete, Post } from '@/utils/maestro'

export async function setRole (id: number, role: ROLE): Promise<number> {
  const uri = `users/${id}/role`
  return await Post(uri, { role })
}

export async function setName (id: number, name: string): Promise<number> {
  const uri = `users/${id}/name`
  return await Post(uri, { name })
}

export async function deleteTeam (id: number): Promise<Response> {
  const uri = `users/${id}`
  return await Delete(uri)
}
