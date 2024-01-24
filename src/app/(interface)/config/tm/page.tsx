'use client'
import { GetTmConnection } from '../../tmSetup'

export default function Page (): JSX.Element {
  const tmStatus = undefined
  const disabled = (tmStatus === undefined)

  if (disabled) {
    return <>TM already configured</>
  } else {
    return <GetTmConnection />
  }
}
