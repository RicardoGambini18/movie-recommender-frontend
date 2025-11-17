'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

import { AppStoreLoader } from '~/components/app-store-loader'
import { Toaster } from '~/components/ui/sonner'
import { queryClient } from '~/lib/query-client'

type ProvidersProps = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreLoader>{children}</AppStoreLoader>
      <Toaster />
    </QueryClientProvider>
  )
}
