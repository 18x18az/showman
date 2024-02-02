import { Metadata } from 'next'
import { Checkin } from './checkin'

export const metadata: Metadata = {
  title: 'Team Check-In'
}

export default function Page (): JSX.Element | null {
  return (
    <Checkin />
  )
}
