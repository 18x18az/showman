import { makeShortMatchName } from '@/utils/strings/match'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../ui/dropdown-menu'
import { SittingInformationFragment } from '../../../../__generated__/graphql'

function FieldActionMenu (props: { options: JSX.Element[] }): JSX.Element {
  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={props.options.length === 0}>
          <button className='flex h-8 w-8 p-2 data-[state=open]:bg-muted'><DotsHorizontalIcon /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.options}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export enum FieldStatus {
  ACTIVE = 'ACTIVE',
  ON_DECK = 'ON_DECK',
  WRONG_FIELD = 'WRONG_FIELD'
}

export interface CommonFieldProps {
  match: SittingInformationFragment | null
  text?: JSX.Element
  status?: FieldStatus
  options: JSX.Element[]
}

function MatchName (props: { match: SittingInformationFragment | null }): JSX.Element {
  const name = props.match !== null ? makeShortMatchName(props.match) : ''

  return <h1 className='text-4xl text-center text-slate-11 mb-4'>{name}</h1>
}

function MatchText (props: { text: JSX.Element | undefined }): JSX.Element {
  return <h2 className='text-2xl text-center text-slate-11 mb-8'>{props.text}</h2>
}

enum OutlineColor {
  EMPTY = 'border-slate-5',
  NORMAL = 'border-slate-7',
  WRONG_FIELD = 'border-yellow-7',
  LIVE_FIELD = 'border-indigo-7',
  ON_DECK_FIELD = 'border-gold-7'
}

function getOutlineColor (match: SittingInformationFragment | null, status: FieldStatus | undefined): OutlineColor {
  if (match === null) {
    return OutlineColor.EMPTY
  } else if (status === FieldStatus.ACTIVE) {
    return OutlineColor.LIVE_FIELD
  } else if (status === FieldStatus.ON_DECK) {
    return OutlineColor.ON_DECK_FIELD
  } else if (status === FieldStatus.WRONG_FIELD) {
    return OutlineColor.WRONG_FIELD
  }

  return OutlineColor.NORMAL
}

export function CommonFieldInfo (props: CommonFieldProps): JSX.Element {
  const match = props.match
  const status = props.status
  const border = getOutlineColor(match, status)

  const bgColor = match === null ? '' : 'bg-slate-2'

  return (
    <div className={`h-72 w-72 border rounded-lg flex flex-col justify-apart' ${border} ${bgColor}`}>
      <FieldActionMenu options={props.options} />
      <MatchName match={props.match} />
      <MatchText text={props.text} />
    </div>
  )
}
