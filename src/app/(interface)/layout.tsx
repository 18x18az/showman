import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/providers'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Orchestrator',
  description: 'Tournament management for the 21st century',
  generator: 'Next.js',
  manifest: '/manifest.json',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'icon', url: 'maskable-icon.png' }
  ]
}

export default function RootLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-1 h-screen`}>
        <Providers>
          <div className='flex flex-col h-full w-full'>
            <Navbar />
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
