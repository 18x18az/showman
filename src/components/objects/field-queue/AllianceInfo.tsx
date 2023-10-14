interface AllianceInfoProps {
  readonly teams: string[]
  readonly alliance: 'red' | 'blue'
}

export function AllianceInfo (props: AllianceInfoProps): JSX.Element {
  const location = props.alliance === 'blue' ? 'pl-6' : 'pr-6'
  const textStyle = props.alliance === 'red' ? 'border-r-8 border-red-9 pr-6 text-right' : 'pl-6 border-l-8 border-blue-9'
  return (
    <div className={`bg-slate-5 flex flex-col m-4 py-8 w-1/3 ${location} rounded-md`}>
      {props.teams.map((team, index) => {
        return <div key={index} className={`${textStyle} text-slate-12 text-9xl`}>{team}</div>
      })}
    </div>
  )
}
