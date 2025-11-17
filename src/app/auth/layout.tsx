'use client'

import { redirect } from 'next/navigation'

import { useAppStore } from '~/lib/app-store'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = useAppStore((store) => !!store.auth.token)

  if (isAuthenticated) redirect('/dashboard')

  return <>{children}</>
}
