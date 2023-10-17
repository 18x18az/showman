import { ROLE } from '@18x18az/maestro-interfaces'

export function getRoleText (role: ROLE): string {
  switch (role) {
    case ROLE.ADMIN:
      return 'Admin'
    case ROLE.CHECKIN:
      return 'Check-in'
    case ROLE.EMCEE:
      return 'Emcee'
    case ROLE.REFEREE:
      return 'Referee'
    case ROLE.LOCAL:
      return 'Local'
    case ROLE.NONE:
      return 'Unassigned'
    default:
      return 'Unknown'
  }
}
