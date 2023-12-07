import { JsonTopic } from '../utils/maestro'

export interface TeamInformation {
  number: string
  name: string
  location: string
  school: string
}

export function TeamsInformationSubscription (): TeamInformation[] | undefined {
  return JsonTopic<{ teams: TeamInformation[] }>('teams')?.teams
}
