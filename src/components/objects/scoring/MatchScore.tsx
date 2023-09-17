import { AllianceInput } from './AllianceInput'

export function MatchScore (): JSX.Element {
  return (
    <div className='flex flex-col lg:flex-row'>
      <AllianceInput alliance='red' />
      <AllianceInput alliance='blue' />
    </div>
  )
}
