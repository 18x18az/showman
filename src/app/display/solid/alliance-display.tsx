import { useAllianceSelectionResultsQuery } from '../../../__generated__/graphql'

interface TeamInfo {
  id: number
  number: string
}

interface AllianceProps {
  teams: TeamInfo[]
}

function Alliance (props: AllianceProps): JSX.Element {
  const teams = props.teams
  return (
    <div className='flex justify-center content-center align-center items-center'>
      <div className='bg-zinc-900 flex rounded-xl w-5/6 p-4 bg-opacity-[0.96]'>
        <div className='text-6xl text-zinc-50 font-semibold font-sans basis-0 grow'>{teams[0].number}</div>
        <div className='text-6xl text-zinc-400 font-semibold font-sans basis-0 grow'>{teams[1].number}</div>
      </div>
    </div>
  )
}

export function AllianceDisplay (): JSX.Element {
  const { data } = useAllianceSelectionResultsQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  const status = data.allianceSelection

  if (status === null) return <></>

  const alliances = status.alliances.map((alliance) => {
    return <Alliance key={alliance[0].id} teams={alliance} />
  })

  return (
    <div className='grid w-full h-screen grid-cols-4 grid-rows-4 py-44'>
      {alliances}
    </div>
  )
}
