import { Metadata } from 'next'
import { Devices } from './devices'

export const metadata: Metadata = {
  title: 'Devices'
}

export default function Page (): JSX.Element {
  return (
    <>
      <Devices />
    </>
  )
}
