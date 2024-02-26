import { useEditScoreMutation, useSaveScoreMutation } from '../../../__generated__/graphql'
import { useErrorableMutation } from '../../../hooks/useErrorableMutation'
import { IconButton } from '../../primitives/IconButton'
import { CheckCircledIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'

interface SaveBarProps {
  readonly locked: boolean
  readonly hidden: boolean
  readonly matchId: number
  readonly changed: boolean
}

const SIZE = 'h-4 w-4'

export function SaveBar (props: SaveBarProps): JSX.Element {
  const updateScore = useErrorableMutation(useEditScoreMutation, { refetchQueries: ['WorkingScore'] })
  const locked = props.locked
  const lockIcon = locked ? <LockClosedIcon className={`${SIZE} text-slate-12`} /> : <LockOpen2Icon className={`${SIZE} text-slate-12`} />
  const canSave = locked && props.changed
  const matchId = props.matchId

  const saveAction = useErrorableMutation(useSaveScoreMutation, { variables: { matchId } })

  const eyeIcon = props.hidden ? <EyeClosedIcon className={`${SIZE} text-slate-12`} /> : <EyeOpenIcon className={`${SIZE} text-slate-12`} />

  const saveTextColor = canSave ? 'text-slate-12' : 'text-slate-9'

  return (
    <div className='flex justify-center gap-x-16 my-4'>
      <IconButton onClick={() => {
        void updateScore({ variables: { matchId, edit: { locked: !locked } } })
      }}
      >{lockIcon}
      </IconButton>
      <IconButton locked={!canSave} onClick={() => { void saveAction() }}><CheckCircledIcon className={`${SIZE} ${saveTextColor}`} /></IconButton>
      <IconButton onClick={() => {}}>{eyeIcon}</IconButton>
    </div>
  )
}
