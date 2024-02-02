import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './apollo-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Display Page'
}

export default function RootLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-0 h-dvh`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
