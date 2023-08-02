import { VHFix } from '@fineai/ui/vh-fix'
import { cn } from '@fineai/utils'

import '@/styles/globals.css'

import { sansFont, sansMono } from '@/assets/fonts'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          sansFont.variable,
          sansMono.variable
        )}
      >
        <VHFix />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {modal}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
