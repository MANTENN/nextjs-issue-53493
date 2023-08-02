'use client'

import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { Button } from '@fineai/ui/button'
import { Primitive } from '@fineai/ui/primitive'
import { cn } from '@fineai/utils'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const buttons = [
  {
    label: '浅色',
    icon: Sun,
    theme: 'light'
  },
  {
    label: '系统',
    icon: Laptop,
    theme: 'system'
  },
  {
    label: '深色',
    icon: Moon,
    theme: 'dark'
  }
] as const

let isClient = false

const ThemeSwitcher = forwardRef<
  ElementRef<typeof Primitive.div>,
  ComponentPropsWithoutRef<typeof Primitive.div>
>(({ className, children, ...props }, forwardedRef) => {
  const [ready, setReady] = useState(isClient)
  useEffect(() => {
    isClient = true
    setReady(true)
  }, [])

  return (
    <Primitive.div
      className={cn(
        'flex items-center rounded-full border',
        {
          'opacity-0 pointer-events-none': !ready
        },
        ready ? className : undefined
      )}
      {...props}
      ref={forwardedRef}
    >
      {ready && <ClientSwitcher />}
      {children}
    </Primitive.div>
  )
})

function ClientSwitcher() {
  const { theme: current = 'system', setTheme } = useTheme()
  return (
    <>
      {buttons.map(({ label, icon: Icon, theme }) => (
        <Button
          type="button"
          variant="link"
          className={cn('h-7 w-7 rounded-full transition', {
            'bg-muted': theme === current,
            'text-muted-foreground': theme !== current
          })}
          size="icon"
          key={theme}
          aria-label={label}
          onClick={() => setTheme(theme)}
        >
          <Icon size={16} />
        </Button>
      ))}
    </>
  )
}

ThemeSwitcher.displayName = 'ThemeSwitcher'

export { ThemeSwitcher }
