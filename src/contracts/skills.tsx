import { EmptyPost, JsonTopic } from '../utils/maestro'
import { CONTROL_MODE } from './fields'

export async function queueProgrammingSkillsMatch (fieldId: number): Promise<void> {
  await EmptyPost(`skills/${fieldId}/queue/${CONTROL_MODE.AUTO}`)
}

export async function queueDriverSkillsMatch (fieldId: number): Promise<void> {
  await EmptyPost(`skills/${fieldId}/queue/${CONTROL_MODE.DRIVER}`)
}

export async function startSkillsMatch (fieldId: number): Promise<void> {
  await EmptyPost(`skills/${fieldId}/start`)
}

export async function stopSkillsMatch (fieldId: number): Promise<void> {
  await EmptyPost(`skills/${fieldId}/stop`)
}

export const StopTimeSubscription = (fieldId: number): number | null | undefined => {
  return JsonTopic<{ time: number }>(`stopTime/${fieldId}`)?.time
}
