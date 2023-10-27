import { Metadata } from 'next'
import { InspectionSelector } from './selector'
import { Header } from '@/components/primitives/Header'

export const metadata: Metadata = {
  title: 'Inspection'
}

export default function Page (): JSX.Element {
  return (
    <>
      <Header name='Inspection' description='Select a team' />
      <InspectionSelector />
    </>
  )
}
