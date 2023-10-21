'use client'

import { useEffect, useState } from 'react'
import { Client } from 'paho-mqtt'

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

function BaseTopic (topic: string | undefined, initial: string): string {
  const [variable, setVariable] = useState(initial)
  useEffect(() => {
    if (topic === undefined) {
      return
    }
    const client = new Client(getMqttHost(), Math.random().toString(16))
    client.connect({ onSuccess: () => { client.subscribe(topic) } })

    client.onMessageArrived = (message) => {
      setVariable(message.payloadString)
    }

    return () => {
      client.disconnect()
    }
  }, [topic])

  return variable
}

export function StringTopic<Type> (topic: string | undefined, initial: Type): Type {
  const raw = BaseTopic(topic, initial as string)
  return raw as Type
}

export function JsonTopic<Type> (topic: string | undefined, initial: Type): Type {
  const initialString = JSON.stringify(initial)
  const raw = BaseTopic(topic, initialString)
  return JSON.parse(raw)
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

export async function Post (resource: string, payload: object): Promise<Response> {
  const url = makeUrl(resource)
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
