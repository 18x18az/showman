'use client'
import { useTheme } from 'next-themes'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home (): JSX.Element | null {
  const [mounted, setMounted] = useState(false)

  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (resolvedTheme === undefined) {
    setTheme('dark')
  }

  redirect('/competition-control')

  return (
    <div />
  )
}
