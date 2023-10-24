import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/providers'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/primitives/Navbar'

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950`}>
        <Providers>
          <div className='flex flex-row min-h-screen justify-center items-start'>
            <div className='xl:p-8 xl:border xl:rounded-lg xl:mt-12 xl:w-2/3 m-2 xl:border-zinc-700'>
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
