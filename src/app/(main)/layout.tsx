import { Button } from '@fineai/ui/button'
import { Drawer } from '@fineai/ui/drawer'
import { X } from 'lucide-react'

import { Header } from './header'

import { Logo } from '@/components/logo'
import { ThemeSwitcher } from '@/components/theme-switcher'

interface MainLayoutProps {
  children: React.ReactNode
  drawer: React.ReactNode
}

export default function MainLayout({ children, drawer }: MainLayoutProps) {
  return (
    <Drawer.Root asChild breakpoint="md" className="bg-black">
      <section>
        <Drawer.Content asChild>
          <main className="flex min-h-screen origin-[center_100vh] flex-col bg-background transition-all ease-in-out data-[state=open]:scale-95 data-[state=open]:rounded-t-2xl data-[state=open]:shadow data-[state=open]:brightness-50 dark:data-[state=open]:shadow-white/50">
            <Header />
            {children}
          </main>
        </Drawer.Content>
        <Drawer.Sider asChild>
          <section className="absolute overflow-y-hidden">
            <Drawer.Overlay className="!cursor-default" />
            <aside className="pointer-events-none w-full overflow-y-hidden md:w-72">
              <div className="pointer-events-auto z-0 min-h-screen w-fit max-w-full rounded-r-xl border-r bg-background dark:bg-background/80 dark:backdrop-blur-lg md:w-full md:rounded-none md:bg-none dark:md:backdrop-blur-none">
                <div className="relative flex h-[calc(var(--vh,1vh)*100)] flex-col overflow-y-auto p-6 pb-10">
                  <div className="relative z-20 flex items-center justify-between">
                    <Drawer.Close asChild>
                      <Logo className="focus:outline-none" />
                    </Drawer.Close>
                    <Drawer.Close asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-2 transition-colors active:text-foreground/80 md:hidden"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </Drawer.Close>
                  </div>
                  <div className="flex-1">{drawer}</div>
                  <div className="pointer-events-none flex flex-col items-center justify-center">
                    <ThemeSwitcher className="pointer-events-auto bg-background/50 p-0.5 shadow-sm animate-in fade-in slide-in-from-bottom-2" />
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </Drawer.Sider>
      </section>
    </Drawer.Root>
  )
}
