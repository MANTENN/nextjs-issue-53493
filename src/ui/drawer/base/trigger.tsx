import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'
import { cn } from '@fineai/utils'
import { composeEventHandlers } from '@radix-ui/primitive'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { Primitive } from '@radix-ui/react-primitive'

import { ScopedProps, useDrawerContext } from './context'

const TRIGGER_NAME = 'DrawerTrigger'

type TriggerElement = ElementRef<typeof Primitive.button>
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>

interface TriggerProps extends PrimitiveButtonProps {}

const Trigger = forwardRef<TriggerElement, TriggerProps>(
  (
    { __scopeDrawer, className, ...props }: ScopedProps<TriggerProps>,
    forwardedRef
  ) => {
    const context = useDrawerContext(TRIGGER_NAME, __scopeDrawer)
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef)

    return (
      <Primitive.button
        {...(props.asChild ? {} : { type: 'button' })}
        aria-expanded={context.open}
        area-aria-controls={context.drawerId}
        data-state={context.open ? 'open' : 'closed'}
        {...props}
        className={cn('drawer-trigger', className)}
        ref={composedTriggerRef}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    )
  }
)

Trigger.displayName = TRIGGER_NAME

export { Trigger }
export type { TriggerProps }
