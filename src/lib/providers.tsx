'use client'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { reduxStore } from './redux'

export default function Providers ({ children }: any): JSX.Element {
  return (
    <ThemeProvider attribute='class'>
      <ReduxProvider store={reduxStore}>
        {children}
      </ReduxProvider>
    </ThemeProvider>
  )
}
