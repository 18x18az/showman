import '../globals.css'
import type { Metadata, Viewport } from 'next'
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
  icons: [
    { rel: 'icon', url: '/maskable-icon.png' }
  ]
}

export const viewport: Viewport = {
  themeColor: '#996c254d',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover'
}

export default function RootLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-1 h-full`}>
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
