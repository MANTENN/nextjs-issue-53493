import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'
import { cn } from '@fineai/utils'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { Primitive } from '@radix-ui/react-primitive'

import { ScopedProps, useDrawerContext } from './context'

const CONTENT_NAME = 'DrawerContent'

type ContentElement = ElementRef<typeof Primitive.div>
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface ContentProps extends PrimitiveDivProps {}

const Content = forwardRef<ContentElement, ContentProps>(
  (
    { __scopeDrawer, className, ...props }: ScopedProps<ContentProps>,
    forwardedRef
  ) => {
    const context = useDrawerContext(CONTENT_NAME, __scopeDrawer)
    const composedContentRef = useComposedRefs(forwardedRef, context.contentRef)

    return (
      <Primitive.div
        {...props}
        className={cn('drawer-content', className)}
        data-state={context.open ? 'open' : 'closed'}
        ref={composedContentRef}
      />
    )
  }
)

Content.displayName = CONTENT_NAME

export { Content }
export type { ContentProps }
