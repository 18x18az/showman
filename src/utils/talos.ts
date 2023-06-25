import * as mqtt from 'mqtt/dist/mqtt'
import { useEffect, useState } from 'react'

const host = window.location.hostname // TODO handle Bifrost
const mqttBroker = `mqtt://${host}:1819`

function BaseTopic (topic: string, initial: string): string {
  const [variable, setVariable] = useState(initial)
  let client: mqtt.MqttClient
  useEffect(() => {
    console.log('hello')

    const mqttOption = {
      protocol: 'ws' as const,
      clientId: Math.random().toString(16)
    }

    console.log(mqttOption)

    client = mqtt.connect(mqttBroker, mqttOption)
    client.on('message', (topic, payload): void => (setVariable(payload.toString())))
    client.subscribe(topic)

    return () => {
      console.log('ended')
      client.end()
    }
  }, [])

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
