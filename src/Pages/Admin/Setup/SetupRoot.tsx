import { ConnectionInfo, ConnectionState } from '@18x18az/rosetta'
import { JsonTopic } from '../../../utils/talos'

export function SetupRoot (): JSX.Element { 
  const mobile = JsonTopic<ConnectionInfo>('state/middleman/mobile', { state: ConnectionState.IDLE, info: '' })
  const database = JsonTopic<ConnectionInfo>('state/middleman/database', { state: ConnectionState.IDLE, info: '' })
  const web = JsonTopic<ConnectionInfo>('state/middleman/web', { state: ConnectionState.IDLE, info: '' })
  return (
    <>
      {JSON.stringify(mobile)}
      {JSON.stringify(database)}
      {JSON.stringify(web)}
    </>
  )
}
