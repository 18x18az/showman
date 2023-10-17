import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Display'
}

export default function DisplayLayout ({
  children
}: {
  readonly children: React.ReactNode
}): JSX.Element {
  return (
    <div className='dark'>
      {children}
    </div>
  )
}
