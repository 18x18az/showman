import type { Metadata } from 'next'
import Providers from '../../lib/providers'
import { SessionManager } from '../../utils/sessionManager'

export const metadata: Metadata = {
  title: 'Event Orchestrator',
  description: 'Tournament management for the 21st century'
}

export default function ControlLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.Element {
  return (
    <Providers> I'm provided for!
      <SessionManager />
      {children}
    </Providers>
  )
}
