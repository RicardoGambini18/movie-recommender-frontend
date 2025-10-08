import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { Button } from '~/components/ui/button'

interface HeaderLayoutProps {
  title?: string
  backUrl?: string
  subtitle?: string
  children: ReactNode
  rightElement?: ReactNode
}

export function HeaderLayout({
  backUrl,
  children,
  subtitle,
  rightElement,
  title = 'Recomendador de Películas',
}: Readonly<HeaderLayoutProps>) {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <header className="border-b border-slate-700/50 glass-light bg-slate-900/30 flex-shrink-0 relative z-20">
        <div className="container mx-auto px-4 py-4 gap-3 h-[76px] flex items-center justify-between max-w-[960px]">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {backUrl && (
              <Link href={backUrl}>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            )}
            <div className="hidden md:flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-lg flex-shrink-0">
              <span className="text-black font-bold text-sm">IMDb</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-bold text-white truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-slate-400 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {rightElement && (
            <div className="flex items-center gap-3 flex-shrink-0">
              {rightElement}
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-[960px]">
          {children}
        </div>
      </main>
    </div>
  )
}
