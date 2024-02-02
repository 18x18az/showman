import { useInspectionGroupsQuery } from '../../../__generated__/graphql'
import { LogoFallback } from './fallback'

interface Team {
  readonly number: string
}

function InspectionGroup (props: { readonly title: string, readonly teams: Team[] }): JSX.Element {
  const teams = props.teams.map((team) => {
    return (
      <div className='text-center text-2xl text-zinc-50' key={team.number}>
        {team.number}
      </div>
    )
  })

  return (
    <div className='flex flex-col w-96 gap-8 mt-8'>
      <h1 className='text-center text-4xl text-slate-11 text-zinc-400'>{props.title}</h1>
      <div className='grid grid-cols-2'>
        {teams}
      </div>
    </div>
  )
}

export function InspectionDisplay (): JSX.Element {
  const { data } = useInspectionGroupsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <LogoFallback />
  }

  return (
    <div className='flex h-full w-full p-8 justify-center'>
      <div className='bg-zinc-900 flex gap-8 rounded-xl px-8 bg-opacity-[0.96]'>
        <InspectionGroup title='Not Checked In' teams={data.notCheckedIn} />
        <InspectionGroup title='Not Started' teams={data.notStarted} />
        <InspectionGroup title='In Progress' teams={data.inProgress} />
        <InspectionGroup title='Complete' teams={data.completed} />
      </div>
    </div>
  )
}
