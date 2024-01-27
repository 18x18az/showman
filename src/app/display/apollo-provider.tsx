'use client'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from '../../apollo-client'

export default function Providers ({ children }: any): JSX.Element {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
