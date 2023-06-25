import { EventStage } from '@18x18az/rosetta'
import { loading } from '../Common.tsx/Loading'
import { SetupRoot } from './Setup/SetupRoot'

interface Props {
  stage: EventStage
}

export function AdminRoot (props: Props): JSX.Element {
  let body
  switch (props.stage) {
    case EventStage.SETUP:
      document.title = 'Setup'
      body = SetupRoot()
      break
    case EventStage.LOADING:
      document.title = 'Admin'
      body = loading()
      break
    default:
      document.title = props.stage
  }
  return (
    <div className='web admin'>
      {body}
    </div>
  )
}
