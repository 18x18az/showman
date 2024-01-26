'use client'
import Logo from '../../../components/primitives/logo'
import { ParticlesBg } from './particles'
import { ResultDisplay } from './results'

function LogoFallback (): JSX.Element {
  return (
    <div className='flex flex-col justify-evenly h-full w-full'>
      <div className='flex justify-evenly'>
        <Logo className='bg-zinc-900 rounded-2xl' viewBox='0 0 350.417 279.405' style={{ width: '65%', height: '100%' }} />
      </div>
    </div>
  )
}

function getContent (): JSX.Element | null {
  return <ResultDisplay />
}

export default function Page (): JSX.Element {
  const content = getContent() ?? <LogoFallback />

  return (
    <div className='h-screen w-full'>
      <ParticlesBg />
      {content}
    </div>
  )
}
