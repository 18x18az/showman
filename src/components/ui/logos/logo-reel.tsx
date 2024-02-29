'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const LOGO_REEL_INTERVAL = 20

const sponsors = [
  'Dallas-Sports-Commission.png',
  'Eaton.png',
  'Google.png',
  'Innovation-First-International.png',
  'Kettering-University.png',
  'NASA.png',
  'Northrop-Grumman-Foundation.png',
  'Tesla.png',
  'Texas-Instruments.png',
  'US-Army.png',
  'VEX-Robotics.png'
]

function calculateSponsorIndex (): number {
  // time since epoch / 30 % sponsors.length
  const time = Math.floor(Date.now() / 1000)
  return Math.floor(time / LOGO_REEL_INTERVAL % sponsors.length)
}

export function LogoReel (): JSX.Element {
  const [sponsorIndex, setSponsorIndex] = useState(calculateSponsorIndex())

  useEffect(() => {
    const interval = setInterval(() => {
      setSponsorIndex(calculateSponsorIndex())
    }, 100)

    return () => clearInterval(interval)
  })

  const sponsor = sponsors[sponsorIndex]
  const logoPath = `/sponsors/${sponsor}`

  return <Image src={logoPath} alt='sponsor' objectFit='contain' fill />
}
