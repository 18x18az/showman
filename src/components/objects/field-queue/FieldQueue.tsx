import { AllianceInfo } from './AllianceInfo'
import { Title } from './Title'

interface FieldQueueProps {
  red: string[]
  blue: string[]
  title: string
}

export function FieldQueue (props: FieldQueueProps): JSX.Element {
  return (
    <div className='flex flex-col bg-slate-3 m-16 rounded-lg fixed left-0 right-0 top-0 bottom-0'>
      <div className='flex-1 grow'>
        <Title title={props.title} />
      </div>
      <div className='flex-1 grow' />
      <div className='flex justify-between'>
        <AllianceInfo teams={props.blue} alliance='blue' />
        <AllianceInfo teams={props.red} alliance='red' />
      </div>

    </div>
  )
}
