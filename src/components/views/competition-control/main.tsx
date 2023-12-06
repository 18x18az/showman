import { FieldInfos } from './field-info/main'
import { MatchControl } from './match-control'
import { UnqueuedMatches } from './matches'
import { Queueing } from './queue-control'
import { Settings } from './settings'

function RightBar (): JSX.Element {
  const elements = [
    MatchControl,
    Queueing,
    Settings
  ]

  const submenus = elements.map((element) => {
    return (
      <div className='border border-zinc-800 p-8 rounded-xl' key={element.name}>
        {element()}
      </div>
    )
  })

  return (
    <div className='flex flex-col gap-8'>
      {submenus}
    </div>
  )
}

export function CompetitionControl (): JSX.Element {
  return (
    <div className='flex w-full p-8 gap-8 h-screen'>
      <div className='p-6 flex-col flex justify-evenly h-full grow'>
        <FieldInfos />
        <div className='grow' />
        <UnqueuedMatches />
      </div>
      <RightBar />
    </div>
  )
}
