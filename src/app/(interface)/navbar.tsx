'use client'
import { ClipboardList, ClipboardPen, HeartHandshake, Settings, TowerControl, Users, Video } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { EventStage, useGetEventStageQuery } from '../../__generated__/graphql'

function Stream (): JSX.Element {
  return (
    <Link href='/stream' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <Video className='text-slate-9' /> Stream
    </Link>
  )
}

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

function Checkin (): JSX.Element {
  return (
    <Link href='/checkin' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <ClipboardPen className='text-slate-9' /> Checkin
    </Link>
  )
}

function Inspection (): JSX.Element {
  return (
    <Link href='/inspection' className='flex text-slate-11 text-lg gap-2 p-2 pb-1 font-semibold'>
      <ClipboardList className='text-slate-9' /> Inspection
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

  const { data } = useGetEventStageQuery({ pollInterval: 500 })

  const isMobile = width <= 1000

  if (isMobile) {
    return <></>
  }

  const items: JSX.Element[] = []

  items.push(<Control key='control' />)
  items.push(<Stream key='stream' />)
  items.push(<Teams key='teams' />)
  items.push(<Config key='config' />)
  items.push(<Inspection key='inspection' />)

  if (data !== undefined) {
    switch (data.stage.stage) {
      case EventStage.Checkin:
        items.push(<Checkin key='checkin' />)
        break
      case EventStage.Qualifications:
        items.push(<AllianceSelection key='alliance-selection' />)
        break
      case EventStage.AllianceSelection:
        items.push(<AllianceSelection key='alliance-selection' />)
        break
    }
  }

  return (
    <div className='flex bg-slate-1 border-b border-slate-6 gap-2'>
      {items}
    </div>
  )
}
