import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/ui/sidebar-nav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Config'
}

const sidebarNavItems = [
  {
    title: 'Displays',
    href: '/config/displays'
  },
  {
    title: 'Fields',
    href: '/config/fields'
  },
  {
    title: 'Scenes',
    href: '/config/scenes'
  },
  {
    title: 'Cameras',
    href: '/config/cameras'
  },
  {
    title: 'TM',
    href: '/config/tm'
  },
  {
    title: 'Etc',
    href: '/config/etc'
  }
]

interface SettingsLayoutProps {
  readonly children: React.ReactNode
}

export default async function SettingsLayout ({ children }: SettingsLayoutProps): Promise<JSX.Element> {
  return (
    <div className='hidden space-y-4 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Config</h2>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='mr-4'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}
