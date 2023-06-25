import * as mqtt from 'mqtt/dist/mqtt'

const host = window.location.hostname // TODO handle Bifrost
const mqttBroker = `mqtt://${host}:1819`

const mqttOption = {

}

export function handleTopic (topic: string, cb: (topic: string, message: string) => void): void {
  const client = mqtt.connect(mqttBroker, mqttOption)
  client.on('message', (topic, payload) => {
    cb(topic, payload.toString())
  })
  client.subscribe(topic) // TODO determine if this never gets closed and creates a memory leak
}
