import { JsonTopic, Post } from '@/utils/maestro'

export async function setAutomation (enabled: boolean): Promise<void> {
  await Post('competitionControl/automation', { enabled })
}

export enum AutomationState {
  ENABLED = 'ENABLED',
  CAN_ENABLE = 'CAN_ENABLE',
  DISABLED = 'DISABLED',
}

export const AutomationSubscription = (): boolean | undefined => {
  return JsonTopic<{ enabled: boolean }>('automation')?.enabled
}
