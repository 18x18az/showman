import { IconButton } from '../../primitives/IconButton'
import { CheckCircledIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'

interface SaveBarProps {
  locked: boolean
  hidden: boolean
}

const SIZE = 'h-4 w-4'

export function SaveBar (props: SaveBarProps): JSX.Element {
  const lockIcon = props.locked ? <LockClosedIcon className={`${SIZE} text-slate-12`} /> : <LockOpen2Icon className={`${SIZE} text-slate-12`} />
  const canSave = props.locked

  const eyeIcon = props.hidden ? <EyeClosedIcon className={`${SIZE} text-slate-12`} /> : <EyeOpenIcon className={`${SIZE} text-slate-12`} />

  const saveTextColor = canSave ? 'text-slate-12' : 'text-slate-9'

  return (
    <div className='flex justify-center gap-x-16 my-4'>
      <IconButton onClick={() => {}}>{lockIcon}</IconButton>
      <IconButton activeColor='bg-green-9' locked={!canSave} onClick={() => {}}><CheckCircledIcon className={`${SIZE} ${saveTextColor}`} /></IconButton>
      <IconButton onClick={() => {}}>{eyeIcon}</IconButton>
    </div>
  )
}
