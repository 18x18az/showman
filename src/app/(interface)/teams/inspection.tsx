import { useInspectionDataQuery } from '../../../__generated__/graphql'
import { Inspection } from '../../../views/ui/inspection/inspection'

interface InspectionPopoverProps {
  readonly teamId: number
  readonly teamNumber: string
}

export function InspectionPopover (props: InspectionPopoverProps): JSX.Element {
  const { data } = useInspectionDataQuery({ variables: { teamId: props.teamId } })

  if (data === undefined) return <></>

  return (
    <div>
      <Inspection team={{ id: props.teamId, number: props.teamNumber, inspection: data.team.inspection }} />
    </div>
  )
}
