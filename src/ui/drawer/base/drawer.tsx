import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef, useCallback, useEffect, useId, useRef } from 'react'
import { cn, getMediaQuery } from '@fineai/utils'
import { Primitive } from '@radix-ui/react-primitive'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { cva, type VariantProps } from 'class-variance-authority'

import { DrawerProvider, type ScopedProps } from './context'

const drawerVariants = cva('drawer', {
  variants: {
    breakpoint: {
      sm: 'sm:drawer-none',
      md: 'md:drawer-none',
      lg: 'lg:drawer-none',
      xl: 'xl:drawer-none',
      '2xl': '2xl:drawer-none'
    }
  }
})

type DrawerElement = ElementRef<typeof Primitive.div>
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface DrawerProps
  extends PrimitiveDivProps,
    VariantProps<typeof drawerVariants> {
  id?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
}

const Drawer = forwardRef<DrawerElement, ScopedProps<DrawerProps>>(
  (
    {
      __scopeDrawer,
      open: openProp,
      defaultOpen,
      onOpenChange,
      className,
      breakpoint,
      id,
      ...props
    },
    ref
  ) => {
    const selfId = useId()
    id = id || selfId
    const triggerRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const siderRef = useRef<HTMLDivElement>(null)
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    })

    useEffect(() => {
      if (open && breakpoint) {
        const query = getMediaQuery(breakpoint)
        if (query.matches) {
          setOpen(false)
        } else {
          const handler = (ev: MediaQueryListEvent) => setOpen(!ev.matches)
          query.addEventListener('change', handler, { passive: true })
          return () => query.removeEventListener('change', handler)
        }
      }
    }, [open, breakpoint, setOpen])

    return (
      <DrawerProvider
        scope={__scopeDrawer}
        triggerRef={triggerRef}
        contentRef={contentRef}
        siderRef={siderRef}
        drawerId={id}
        open={open}
        onOpenChange={setOpen}
        onOpenToggle={useCallback(() => setOpen(prev => !prev), [setOpen])}
      >
        <Primitive.div
          {...props}
          className={cn(drawerVariants({ breakpoint }), className)}
          data-state={open ? 'open' : 'closed'}
          ref={ref}
        />
      </DrawerProvider>
    )
  }
)

Drawer.displayName = 'Drawer'

export { Drawer, type DrawerProps }
