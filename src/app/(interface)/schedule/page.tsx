import { Metadata } from 'next'
import { SittingList } from './sitting-list'

export const metadata: Metadata = {
  title: 'Teams'
}
export default function Teams (): JSX.Element {
  return <SittingList />
}
