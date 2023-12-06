import { Match } from '@/contracts/match'
import { makeShortMatchName } from '@/utils/strings/match'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../ui/dropdown-menu'

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
  match: Match | null
  text?: string
  status?: FieldStatus
  options: JSX.Element[]
}

function MatchName (props: { match: Match | null }): JSX.Element {
  const name = props.match !== null ? makeShortMatchName(props.match) : ''

  return <h1 className='text-4xl text-center text-zinc-500 mb-4'>{name}</h1>
}

function MatchText (props: { text: string | undefined }): JSX.Element {
  return <h2 className='text-2xl text-center text-zinc-500 mb-8'>{props.text}</h2>
}

enum OutlineColor {
  EMPTY = 'border-zinc-900',
  NORMAL = 'border-zinc-800',
  WRONG_FIELD = 'border-red-900',
  LIVE_FIELD = 'border-green-500',
  ON_DECK_FIELD = 'border-blue-900'
}

function getOutlineColor (match: Match | null, status: FieldStatus | undefined): OutlineColor {
  if (match === null) {
    return OutlineColor.EMPTY
  } else if (status === FieldStatus.ACTIVE) {
    return OutlineColor.LIVE_FIELD
  } else if (status === FieldStatus.ON_DECK) {
    return OutlineColor.ON_DECK_FIELD
  }

  return OutlineColor.NORMAL
}

export function CommonFieldInfo (props: CommonFieldProps): JSX.Element {
  const match = props.match
  const status = props.status
  const border = getOutlineColor(match, status)

  return (
    <div className={`h-72 w-72 border rounded-lg flex flex-col justify-apart' ${border}`}>
      <FieldActionMenu options={props.options} />
      <MatchName match={props.match} />
      <MatchText text={props.text} />
    </div>
  )
}
