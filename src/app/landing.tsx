import { selectIsAssigned } from '../lib/redux'
import { accessRedirect } from '../utils/AccessRedirect'

export function LandingPage (): JSX.Element {
  accessRedirect(selectIsAssigned)
  return <div>Hi!</div>
}
