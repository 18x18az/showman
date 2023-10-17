import { Metadata } from 'next'
import CheckInBody from './checkin'

export const metadata: Metadata = {
  title: 'Team Check-In'
}

export default function CheckIn (): JSX.Element | null {
  return (
    <CheckInBody />
  )
}
