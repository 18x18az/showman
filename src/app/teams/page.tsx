import { Metadata } from 'next'
import { TeamList } from './teamList'

export const metadata: Metadata = {
    title: 'Teams'
  }
export default function Teams(): JSX.Element {
    return <TeamList />
}