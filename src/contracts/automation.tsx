import { JsonTopic, Post } from '@/utils/maestro'

export async function setAutomation (state: boolean): Promise<void> {
  await Post('fieldControl/automation', { state })
}

export enum AutomationState {
  ENABLED = 'ENABLED',
  CAN_ENABLE = 'CAN_ENABLE',
  DISABLED = 'DISABLED',
}

export const AutomationSubscription = (): AutomationState | undefined => {
  return JsonTopic<{ state: AutomationState }>('automation')?.state
}
