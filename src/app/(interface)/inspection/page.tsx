import { Metadata } from 'next'
import { InspectionSelector } from './selector'

export const metadata: Metadata = {
  title: 'Inspection'
}

export default function Page (): JSX.Element {
  return <InspectionSelector />
}
