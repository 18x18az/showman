import { Alliance, QueuedMatch } from '@18x18az/maestro-interfaces'

interface MatchControlProps {
  match: QueuedMatch
}

interface AllianceProps {
  alliance: Alliance
}

function AllianceInfo (props: AllianceProps): JSX.Element {
  const teams = [props.alliance.team1]
  if (props.alliance.team2 !== undefined) {
    teams.push(props.alliance.team2)
  }

  const teamElements = teams.map((team) => {
    return <div key={team} className='text-2xl'>{team}</div>
  })

  return <div className='flex-col'>{teamElements}</div>
}

export function MatchControl (props: MatchControlProps): JSX.Element {
  const match = props.match

  if (Object.keys(match).length === 0) {
    return <></>
  }

  return (
    <div className='text-center w-48 border rounded-lg border-zinc-700'>
      <h1 className='text-2xl'>{match.number}</h1>
      <h2 className='text-xl'>{match.fieldName}</h2>
      <div>
        <div className='flex justify-evenly'>
          <AllianceInfo alliance={match.red} />
          <AllianceInfo alliance={match.blue} />
        </div>
      </div>
    </div>
  )
}
