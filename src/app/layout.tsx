import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Orchestrator',
  description: 'Tournament management for the 21st century'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html lang='en'>
      <body className={inter.className}>
      <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
