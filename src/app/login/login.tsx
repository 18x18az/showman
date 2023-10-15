'use client'

import { selectUserName, useSelector } from '@/lib/redux'

export function LoginBody (): JSX.Element {
  const name = useSelector(selectUserName)
  console.log(name)

  // Cut name to last 10 characters
  let shortName = name ?? ''
  if (shortName.length > 10) {
    shortName = '...' + shortName.substring(shortName.length - 10)
  }

  return (
    <div className='text-center mt-40 bg-slate-3 w-fit absolute left-1/2 -translate-x-1/2 py-12 px-32 rounded-lg'>
      <h1 className='text-slate-12 text-4xl mb-8'>Device Name</h1>
      <h2 className='text-indigo-9 text-7xl'>{shortName}</h2>
    </div>
  )
}
