import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.IntrinsicElements['html'] {
  return (
    <html className='dark' lang='en' suppressHydrationWarning style={{ colorScheme: 'dark' }}>
      <body className={`${inter.className} bg-slate-0 dark`}>
        {children}
      </body>
    </html>
  )
}
