'use client'

import { useMemo } from 'react'
import { Button } from '@fineai/ui/button'
import { Drawer } from '@fineai/ui/drawer'
import { cn } from '@fineai/utils'
import { FolderCheck, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Menu {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  name: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  search?: string
}

const menu: Menu[] = [
  {
    title: 'Browse',
    items: [
      {
        name: 'Homepage',
        icon: Home,
        path: '/'
      },
      {
        name: 'My Feed',
        icon: FolderCheck,
        path: '/personal-feed'
      }
    ]
  }
]

export default function Sider() {
  const pathname = usePathname()
  const matchActive = (path: string) => pathname === path

  return (
    <div className="w-60 max-w-full space-y-4 py-4 animate-in fade-in-0 slide-in-from-bottom-3">
      {menu.map(({ title, items }) => (
        <div className="-mx-3.5 py-2" key={title}>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <div className="space-y-1.5">
            {items.map(({ name, icon: Icon, path, search = '' }) => (
              <Button
                variant={matchActive(path) ? 'secondary' : 'ghost'}
                className={cn('relative w-full justify-start', {
                  'before:content-[""] before:block before:w-1 before:h-[60%] before:rounded-full before:rainbow before:absolute before:right-1.5 before:animate-in before:slide-in-from-right-1':
                    matchActive(path)
                })}
                asChild
                key={name}
              >
                <Drawer.Close asChild>
                  <Link href={`${path}${search}`} suppressHydrationWarning>
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Link>
                </Drawer.Close>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
