import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { cn } from '@fineai/utils'
import { composeEventHandlers } from '@radix-ui/primitive'
import { Primitive } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'

import { ScopedProps, useDrawerContext } from './context'

const OVERLAY_NAME = 'DrawerOverlay'

type OverlayElement = ElementRef<typeof Primitive.div>
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface OverlayProps extends PrimitiveDivProps {}

const Overlay = forwardRef<OverlayElement, OverlayProps>(
  ({ __scopeDrawer, className, ...props }: ScopedProps<OverlayProps>, ref) => {
    const context = useDrawerContext(OVERLAY_NAME, __scopeDrawer)

    return (
      <RemoveScroll
        enabled={context.open}
        as={Slot}
        allowPinchZoom
        shards={[context.siderRef]}
      >
        <Primitive.div
          {...props}
          className={cn('drawer-overlay h-screen', className)}
          data-state={context.open ? 'open' : 'closed'}
          ref={ref}
          onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
        />
      </RemoveScroll>
    )
  }
)

Overlay.displayName = OVERLAY_NAME

export { Overlay }
export type { OverlayProps }
