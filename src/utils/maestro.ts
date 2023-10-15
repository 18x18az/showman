'use client'

import { useEffect, useState } from 'react'
import { Client } from 'paho-mqtt'

function getHostname (): string {
  return 'l.18x18az.org'
}

function BaseTopic (topic: string | undefined, initial: string): string {
  const [variable, setVariable] = useState(initial)
  useEffect(() => {
    if (topic === undefined) {
      return
    }
    const client = new Client('wss://l.18x18az.org/mqtt', Math.random().toString(16))
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
  return raw.slice(1, -1) as Type
}

export function JsonTopic<Type> (topic: string | undefined, initial: Type): Type {
  const initialString = JSON.stringify(initial)
  const raw = BaseTopic(topic, initialString)
  return JSON.parse(raw)
}

export async function EmptyPost (resource: string): Promise<Response> {
  const url = `https://${getHostname()}/api/${resource}`
  return await fetch(url, {
    method: 'POST'
  })
}

export async function Post (resource: string, payload: object): Promise<Response> {
  const url = `https://${getHostname()}/api/${resource}`
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
