import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '../lib/providers'
import { SessionManager } from '../utils/sessionManager'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Orchestrator',
  description: 'Tournament management for the 21st century'
}

export default function RootLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-slate-0`}>
        <Providers>
          <SessionManager />
          {children}
        </Providers>
      </body>
    </html>
  )
}
