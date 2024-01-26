'use client'
import { HeartHandshake, Settings, TowerControl, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Control (): JSX.Element {
  return (
    <Link href='/competition-control' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <TowerControl className='text-slate-9' /> Control
    </Link>
  )
}

function Teams (): JSX.Element {
  return (
    <Link href='/teams' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <Users className='text-slate-9' /> Teams
    </Link>
  )
}

function AllianceSelection (): JSX.Element {
  return (
    <Link href='/alliance-selection' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <HeartHandshake className='text-slate-9' /> Alliance Selection
    </Link>
  )
}

function Config (): JSX.Element {
  return (
    <Link href='/config' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <Settings className='text-slate-9' /> Config
    </Link>
  )
}

export function Navbar (): JSX.Element {
  const [width, setWidth] = useState<number>(0)

  function handleWindowSizeChange (): void {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  if (isMobile) {
    return <></>
  }

  return (
    <div className='flex bg-slate-1 border-b border-slate-6 gap-2'>
      <Control />
      <Teams />
      <Config />
      <AllianceSelection />
    </div>
  )
}
