import { MatchResolution } from '@18x18az/maestro-interfaces'

export function getResolutionText (resolution: MatchResolution): string {
  switch (resolution) {
    case MatchResolution.IN_PROGRESS:
      return 'In Progress'
    case MatchResolution.NOT_STARTED:
      return 'Not Started'
    case MatchResolution.ON_DECK:
      return 'On Field'
    case MatchResolution.RESOLVED:
      return 'Resolved'
    case MatchResolution.SCORING:
      return 'Scoring'
    case MatchResolution.QUEUED:
      return 'Queued'
    default:
      return 'Unknown'
  }
}
