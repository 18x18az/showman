'use client'
import { useState } from 'react'
import Link from 'next/link'

interface NavbarItem {
  text: string
  href: string
}

const MOBILE_MENU_ID: string = 'mobile'

export function Navbar (): JSX.Element {
  const [mobileMenu, setMobileMenu] = useState('hidden')

  function handleClick (): void {
    setMobileMenu(prevMobileMenu => prevMobileMenu === 'hidden' ? '' : 'hidden')
  }


  const items: NavbarItem[] = []

  items.push({ text: 'Control', href: '/control' })
  items.push({ text: 'Config', href: '/config' })
  items.push({ text: 'Devices', href: '/devices' })
  items.push({ text: 'Inspection', href: '/inspection' })
  items.push({ text: 'Checkin', href: '/checkin' })

  return (
    <nav className='flex items-center justify-between flex-wrap bg-teal-900 p-6'>
      <div className='block lg:hidden'>
        <button onClick={handleClick} className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
          <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
        </button>
      </div>
      <div id={MOBILE_MENU_ID} className={mobileMenu}>
        {
            items.map((value: NavbarItem) => {
              return (
                <Link key={value.href} href={value.href} className='block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white'>
                  {value.text}
                </Link>
              )
            })
          }
      </div>
      <div className='w-full hidden flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-md lg:flex-grow space-x-4'>
          {
            items.map((value: NavbarItem) => {
              return (
                <Link key={value.href} href={value.href} className='block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white'>
                  {value.text}
                </Link>
              )
            })
          }
        </div>
      </div>
    </nav>
  )
}
