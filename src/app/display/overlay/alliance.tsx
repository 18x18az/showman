import { useAllianceSelectionControlQuery } from '../../../__generated__/graphql'
export interface AllianceSelectionStatus {
  picking: string | null
  picked: string | null
  pickable: string[]
  alliances: Array<[string, string]>
  remaining: string[]
}

export function AllianceSelection (): JSX.Element {
  const { data } = useAllianceSelectionControlQuery({ pollInterval: 500 })

  if (data === undefined) return <></>

  const status = data.allianceSelection

  if (status === null) return <></>

  const alliances = status.alliances

  if (alliances.length === 0) return <></>

  const allianceDisplays = alliances.map((alliance, index: number) => {
    // index with padding 0
    const indexString = (index + 1).toString().padStart(2, '0')
    return (
      <div key={alliance[0].id} className='flex gap-4'>
        <div className='text-2xl text-zinc-950 font-bold font-sans bg-zinc-50 p-2  px-4 rounded-md rounded-br-3xl'>{indexString}</div>
        <div className='text-2xl text-zinc-50 font-semibold font-sans p-2'>{alliance[0].number}</div>
        <div className='text-2xl text-zinc-400 font-semibold font-sans p-2'>{alliance[1].number}</div>
      </div>
    )
  })

  return (
    <div className='flex'>
      <div className='flex flex-col bg-zinc-950 width-full m-2 p-3 gap-4 opacity-[0.98] rounded-md rounded-tr-3xl'>{allianceDisplays}</div>
    </div>
  )
}
