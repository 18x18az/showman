import { User } from '.'

export interface LoginPayload extends User {
  token: string
}

export interface SessionInfo extends LoginPayload {}

export type SessionSliceState = Partial<SessionInfo>
