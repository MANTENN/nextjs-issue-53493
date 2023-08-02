import { Button } from '@fineai/ui/button'
import { Drawer } from '@fineai/ui/drawer'
import { Menu } from 'lucide-react'

import { Logo } from '@/components/logo'

export function Header() {
  return (
    <div className="inset-x-0 flex h-[60px] items-center space-x-2 border-b bg-muted/50 px-5 backdrop-blur transition-[padding] md:pointer-events-none md:absolute md:z-[1] md:h-[104px] md:border-none md:bg-transparent md:px-8 md:backdrop-blur-none">
      <div className="flex items-center">
        <Drawer.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 flex items-center justify-center transition-colors active:text-foreground/80 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </Drawer.Trigger>
      </div>
      <div className="flex flex-auto items-center justify-start">
        <Logo className="grow-0 md:hidden" />
      </div>
    </div>
  )
}
