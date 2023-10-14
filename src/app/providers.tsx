'use client'
import { ThemeProvider } from 'next-themes'

export default function Providers ({ children }: any): JSX.Element {
  return (<ThemeProvider attribute='class'> {children} </ThemeProvider>
  )
}
