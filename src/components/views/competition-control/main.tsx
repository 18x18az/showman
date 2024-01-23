import { FieldInfos } from './field-info/main'
import { MatchControl } from './match-control'
import { BottomPanel } from './matches'
import { Queueing } from './queue-control'
import { Settings } from './settings'
// import { Settings } from './settings'

function RightBar (): JSX.Element {
  const elements = [
    MatchControl,
    Queueing,
    Settings
  ]

  const submenus = elements.map((element) => {
    return (
      <div className='border-l border-b border-slate-6 bg-slate-2 p-8 rounded-sm' key={element.name}>
        {element()}
      </div>
    )
  })

  return (
    <div className='flex flex-col h-full'>
      {submenus}
    </div>
  )
}

export function CompetitionControl (): JSX.Element {
  console.log('Competition control')
  return (
    <div className='flex w-full h-full'>
      <div className='p-6 flex-col flex justify-evenly h-full grow'>
        <FieldInfos />
        <div className='grow' />
        <BottomPanel />
      </div>
      <RightBar />
    </div>
  )
}
