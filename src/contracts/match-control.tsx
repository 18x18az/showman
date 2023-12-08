'use client'
import { EmptyPost, JsonTopic, Post } from '../utils/maestro'

export async function callTimeout (): Promise<void> {
  await EmptyPost('fieldControl/timeout')
}

export async function pushLive (): Promise<void> {
  await EmptyPost('competitionControl/pushLive')
}

export async function clearLive (): Promise<void> {
  await EmptyPost('competitionControl/clearLive')
}

export async function replayCurrentMatch (): Promise<void> {
  await EmptyPost('competitionControl/replay')
}

export async function startMatch (): Promise<void> {
  await EmptyPost('competitionControl/start')
}

export async function endEarly (): Promise<void> {
  await EmptyPost('competitionControl/stop')
}

export async function resetMatch (): Promise<void> {
  await EmptyPost('competitionControl/reset')
}

export async function queueMatch (fieldId: number, matchId: number): Promise<void> {
  await Post(`competitionField/${fieldId}/queue`, { matchId })
}

export async function replayMatch (matchId: number): Promise<void> {
  await EmptyPost(`competitionControl/match/${matchId}/replay`)
}

export async function putFieldOnDeck (fieldId: number): Promise<void> {
  await Post('competitionControl/onDeck', { fieldId })
}

export async function removeMatch (matchId: number): Promise<void> {
  await EmptyPost(`competitionControl/match/${matchId}/remove`)
}

export async function enableSkills (enabled: boolean): Promise<void> {
  await Post('competitionControl/enableSkills', { enabled })
}

export const SkillsEnabledSubscription = (): boolean | undefined => {
  return JsonTopic<{ enabled: boolean }>('skillsEnabled')?.enabled
}
