import { useSetInspectionPointMutation } from '@/__generated__/graphql'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'
import { CheckBox } from '@/primitives/check-box/CheckBox'

interface PointInfo {
  id: number
  text: string
  met: boolean
}

interface GroupInfo {
  id: number
  text: string
  points: PointInfo[]
}

interface InspectionProps {
  showAll: boolean
  team: {
    id: number
    number: string
    inspection: GroupInfo[]
  }
}

interface GroupProps {
  teamId: number
  group: GroupInfo
  showAll: boolean
}

interface PointProps {
  teamId: number
  point: PointInfo
}

function Point (props: PointProps): JSX.Element {
  const update = useErrorableMutation(useSetInspectionPointMutation, { refetchQueries: ['InspectionData'] })
  return (
    <div className='flex gap-4'>
      <div>
        <CheckBox value={props.point.met} onChange={(value: boolean) => { void update({ variables: { pointId: props.point.id, teamId: props.teamId, isMet: value } }) }} />
      </div>
      <div>
        {props.point.text}
      </div>
    </div>
  )
}

function Group (props: GroupProps): JSX.Element {
  const points = props.group.points.flatMap((point) => {
    if (point.met && !props.showAll) return ([])

    return <Point key={point.id} teamId={props.teamId} point={point} />
  })

  return (
    <div className='bg-slate-3 p-4 flex flex-col gap-4 text-slate-12 rounded-md'>
      <h1 className='text-2xl text-slate-11'>{props.group.text}</h1>
      {points}
    </div>
  )
}

export function InspectionChecklist (props: InspectionProps): JSX.Element {
  const groups = props.team.inspection.flatMap((group) => {
    if (group.points.every((point) => point.met) && !props.showAll) return ([])

    return <Group key={group.id} teamId={props.team.id} group={group} showAll={props.showAll} />
  })
  return (
    <ScrollArea className='flex-grow'>
      <div className='flex flex-col gap-4 w-full p-4'>
        {groups}
      </div>
    </ScrollArea>
  )
}
