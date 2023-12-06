'use client'

import { useEffect, useState } from 'react'
import { Client } from 'paho-mqtt'
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
    return `http://${host}:2000`
  }
}

function getMqttHost (): string {
  const host = getHostname()
  if (host === SECURE_HOST) {
    return `wss://${host}/mqtt`
  } else {
    return `ws://${host}:1883/`
  }
}

function BaseTopic (topic: string | undefined): string | undefined {
  const [variable, setVariable] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (topic === undefined) {
      return
    }
    const client = new Client(getMqttHost(), Math.random().toString(16))
    client.connect({ onSuccess: () => { client.subscribe(topic) }, reconnect: true })

    client.onMessageArrived = (message) => {
      setVariable(message.payloadString)
    }

    return () => {
      try {
        client.disconnect()
      } catch (e) {
        console.log(e)
      }
    }
  }, [topic])

  return variable
}

export function JsonTopic<Type> (topic: string | undefined): Type | undefined {
  const raw = BaseTopic(topic)
  if (raw === undefined) {
    return undefined
  }
  return JSON.parse(raw)
}

export enum BaseStatus {
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  OFFLINE = 'OFFLINE',
  NOMINAL = 'NOMINAL',
  DEGRADED = 'DEGRADED'
}

export function StatusTopic (topic: string): BaseStatus | undefined {
  const topicName = `status/${topic}`
  const raw = JsonTopic<{ status: BaseStatus }>(topicName)
  if (raw === undefined) {
    return undefined
  }

  return raw.status
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
