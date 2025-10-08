'use client'

import { useAppStore } from '~/lib/app-store'

type AppStoreLoaderProps = {
  children: React.ReactNode
}

export const AppStoreLoader = ({ children }: AppStoreLoaderProps) => {
  const isHydrated = useAppStore((state) => state.isHydrated)

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
