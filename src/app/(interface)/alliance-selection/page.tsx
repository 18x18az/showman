import { Metadata } from 'next'
import { AllianceSelection } from './client'

export const metadata: Metadata = {
  title: 'Alliance Selection'
}

export default function Page (): JSX.Element {
  return <AllianceSelection />
}
