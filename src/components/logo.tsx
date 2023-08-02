import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'
// import Fine from '@fineai/ui/icons/fine'
import { cn } from '@fineai/utils'
import Link from 'next/link'

const Logo = forwardRef<
  ElementRef<typeof Link>,
  Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>
>(({ className, ...props }: { className?: string }, forwardRef) => {
  return (
    <Link
      ref={forwardRef}
      href="/"
      className={cn(
        'flex flex-none select-none items-center text-lg font-medium leading-[1]',
        className
      )}
      {...props}
    >
      <span className="tracking-tighter [font-variant:small-caps]">Fine</span>
      <span className="rainbow-text relative ml-[0.2em] origin-bottom scale-y-95 uppercase tracking-tighter">
        ai
      </span>
    </Link>
  )
})

Logo.displayName = 'Logo'

export { Logo }
