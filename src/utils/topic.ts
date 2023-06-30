import * as mqtt from 'mqtt/dist/mqtt'
import { useEffect, useState } from 'react'

const host = window.location.hostname // TODO handle Bifrost
const mqttBroker = `mqtt://${host}/mqtt:80`

function BaseTopic (topic: string, initial: string): string {
  const [variable, setVariable] = useState(initial)
  useEffect(() => {
    const mqttOption = {
      protocol: 'ws' as const,
      clientId: Math.random().toString(16)
    }

    const client = mqtt.connect(mqttBroker, mqttOption)
    client.on('message', (_t, payload): void => (setVariable(payload.toString())))
    client.subscribe(topic)

    return () => {
      client.end()
    }
  }, [topic])

  return variable
}

export function StringTopic<Type> (topic: string, initial: Type): Type {
  const raw = BaseTopic(topic, initial as string)
  return raw.slice(1, -1) as Type
}

export function JsonTopic<Type> (topic: string, initial: Type): Type {
  const initialString = JSON.stringify(initial)
  const raw = BaseTopic(topic, initialString)
  return JSON.parse(raw)
}
