'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '~/components/ui/button'

const handleLogout = async () => {
  await signOut({ callbackUrl: '/auth' })
}

export function LogoutButton() {
  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Cerrar Sesión</span>
    </Button>
  )
}
