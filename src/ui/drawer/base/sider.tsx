import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef, useEffect } from 'react'
import { cn } from '@fineai/utils'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { FocusGuards } from '@radix-ui/react-focus-guards'
import { FocusScope } from '@radix-ui/react-focus-scope'
import { Primitive } from '@radix-ui/react-primitive'

import { ScopedProps, useDrawerContext } from './context'

const SIDER_NAME = 'DrawerSider'

type SiderElement = ElementRef<typeof Primitive.div>
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface SiderProps extends PrimitiveDivProps {}

const Sider = forwardRef<SiderElement, SiderProps>(
  (
    { __scopeDrawer, className, ...props }: ScopedProps<SiderProps>,
    forwardedRef
  ) => {
    const context = useDrawerContext(SIDER_NAME, __scopeDrawer)
    const composedSiderRef = useComposedRefs(forwardedRef, context.siderRef)

    useEffect(() => {
      if (context.open) {
        context.siderRef.current
          ?.querySelector<HTMLButtonElement>('.drawer-close')
          ?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            context.onOpenChange(false)
          }
        }
        context.siderRef.current?.addEventListener('keydown', handleKeyDown)
        return () => {
          context.siderRef.current?.removeEventListener(
            'keydown',
            handleKeyDown
          )
          context.triggerRef.current?.focus()
        }
      }
    }, [context])

    return (
      <>
        {context.open && <FocusGuards />}
        <input
          type="checkbox"
          readOnly
          id={context.drawerId}
          checked={context.open}
          className="drawer-toggle sr-only"
        />
        <FocusScope
          loop
          asChild
          trapped={context.open}
          onMountAutoFocus={event => event.preventDefault()}
          onUnmountAutoFocus={event => event.preventDefault()}
        >
          <Primitive.div
            {...props}
            className={cn('drawer-side h-screen', className)}
            data-state={context.open ? 'open' : 'closed'}
            ref={composedSiderRef}
          />
        </FocusScope>
      </>
    )
  }
)

Sider.displayName = SIDER_NAME

export { Sider }
export type { SiderProps }
