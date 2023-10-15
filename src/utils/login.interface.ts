export enum Role {
  ADMIN = 'ADMIN',
  CHECKIN = 'CHECKIN',
  REFEREE = 'REFEREE',
  EMCEE = 'EMCEE',
  NONE = 'NONE'
}

export interface LoginInfo {
  token: string
  name: string
  userId: number
  role: Role
}
