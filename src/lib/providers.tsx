'use client'
import { ThemeProvider } from 'next-themes'
import createApolloClient from '../apollo-client'
import { ApolloProvider } from '@apollo/client'

export default function Providers ({ children }: any): JSX.Element {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute='class'>
        {children}
      </ThemeProvider>
    </ApolloProvider>
  )
}
