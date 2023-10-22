'use client'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { reduxStore } from './redux'
import { SessionProvider } from '@/utils/sessionManager'

export default function Providers ({ children }: any): JSX.Element {
  return (
    <ThemeProvider attribute='class'>
      <ReduxProvider store={reduxStore}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}
