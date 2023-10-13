import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Team Check-In'
  }

export default function CheckIn (): JSX.Element | null {
    return (
      <div>
        This is the checkin page
      </div>
    )
  }