import { createContextScope, type Scope } from '@radix-ui/react-context'

const DRAWER_NAME = 'Drawer'

type ScopedProps<P> = P & { __scopeDrawer?: Scope }
const [createDrawerContext, createDrawerScope] = createContextScope(DRAWER_NAME)

type DrawerContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
  siderRef: React.RefObject<HTMLDivElement>
  drawerId: string
  open: boolean
  onOpenChange(open: boolean): void
  onOpenToggle(): void
}

const [DrawerProvider, useDrawerContext] =
  createDrawerContext<DrawerContextValue>(DRAWER_NAME)

export { createDrawerScope, DrawerProvider, useDrawerContext }
export type { ScopedProps }
