import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { cn } from '@fineai/utils'
import { composeEventHandlers } from '@radix-ui/primitive'
import { Primitive } from '@radix-ui/react-primitive'

import { ScopedProps, useDrawerContext } from './context'

const CLOSE_NAME = 'DrawerClose'

type DrawerCloseElement = React.ElementRef<typeof Primitive.button>
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>

interface CloseProps extends PrimitiveButtonProps {}

const Close = forwardRef<DrawerCloseElement, CloseProps>(
  (
    { __scopeDrawer, className, ...closeProps }: ScopedProps<CloseProps>,
    forwardedRef
  ) => {
    const context = useDrawerContext(CLOSE_NAME, __scopeDrawer)

    return (
      <Primitive.button
        type="button"
        {...closeProps}
        ref={forwardedRef}
        className={cn('drawer-close', className)}
        disabled={closeProps.disabled ?? !context.open}
        onClick={composeEventHandlers(closeProps.onClick, () =>
          context.onOpenChange(false)
        )}
      />
    )
  }
)

Close.displayName = CLOSE_NAME

export { Close }
export type { CloseProps }
