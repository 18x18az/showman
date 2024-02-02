import { Inspection, useMarkCheckinMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

interface CheckinProps {
  readonly status: Inspection
  readonly teamId: number
}

function MarkCheckedIn (props: { readonly teamId: number }): JSX.Element {
  return <ErrorableButton mutation={useMarkCheckinMutation} options={{ variables: { teamId: props.teamId, status: Inspection.CheckedIn } }}>Checked In</ErrorableButton>
}

function MarkNotHere (props: { readonly teamId: number }): JSX.Element {
  return <ErrorableButton mutation={useMarkCheckinMutation} options={{ variables: { teamId: props.teamId, status: Inspection.NotHere } }}>Not Here</ErrorableButton>
}

function MarkNoShow (props: { readonly teamId: number }): JSX.Element {
  return <ErrorableButton mutation={useMarkCheckinMutation} options={{ variables: { teamId: props.teamId, status: Inspection.NoShow } }}>No Show</ErrorableButton>
}

export function Checkin (props: CheckinProps): JSX.Element {
  const status = props.status
  const options: JSX.Element[] = []

  if (status !== Inspection.CheckedIn) {
    options.push(<MarkCheckedIn teamId={props.teamId} />)
  }

  if (status !== Inspection.NotHere) {
    options.push(<MarkNotHere teamId={props.teamId} />)
  }

  if (status !== Inspection.NoShow) {
    options.push(<MarkNoShow teamId={props.teamId} />)
  }

  return (
    <div className='flex flex-col gap-2 text-slate-11'>
      {options}
    </div>
  )
}
