'use client'

import axios from 'axios'

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

export enum BaseStatus {
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  OFFLINE = 'OFFLINE',
  NOMINAL = 'NOMINAL',
  DEGRADED = 'DEGRADED'
}

function makeUrl (resource: string): string {
  return `${getApiHostname()}/api/${resource}`
}

export async function Delete (resource: string): Promise<Response> {
  const url = makeUrl(resource)
  return await fetch(url, {
    method: 'DELETE'
  })
}

export async function EmptyPost (resource: string): Promise<Response> {
  const url = makeUrl(resource)
  return await fetch(url, {
    method: 'POST'
  })
}

export async function Post (resource: string, payload: object): Promise<number> {
  const url = makeUrl(resource)
  const response = await axios({
    method: 'POST',
    url,
    data: payload,
    validateStatus: () => true
  })
  return response.status
}
