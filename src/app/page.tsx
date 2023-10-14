'use client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home (): JSX.Element | null {
  const [mounted, setMounted] = useState(false)

  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (resolvedTheme === undefined) {
    setTheme('dark')
  }

  return (
    <div>
      This is the admin page
      <Link href='/checkin'>Check in</Link>
    </div>
  )
}
