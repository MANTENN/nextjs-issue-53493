'use client'

import * as React from 'react'
import { StyledComponentsRegistry } from '@fineai/ui/styled-components-registry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <NextThemesProvider {...props}>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </NextThemesProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
