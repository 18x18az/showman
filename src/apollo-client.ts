import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const SECURE_HOST = 'l.18x18az.org'

function getHostname (): string {
  return window.location.hostname
}

function getApiHostname (): string {
  const host = getHostname()
  if (host === SECURE_HOST) {
    return `https://${host}`
  } else {
    return `http://${host}:3002`
  }
}

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const uri = `${getApiHostname()}/graphql`
  return new ApolloClient({
    uri,
    cache: new InMemoryCache()
  })
}

export default createApolloClient
