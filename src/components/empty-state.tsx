import { FileX, RefreshCw } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface EmptyStateProps {
  title?: string
  retryText?: string
  className?: string
  onRetry?: () => void
  description?: string
  icon?: React.ReactNode
}

export const EmptyState = ({
  icon,
  onRetry,
  className = '',
  retryText = 'Reintentar',
  title = 'No hay datos disponibles',
  description = 'No se encontraron elementos para mostrar.',
}: EmptyStateProps) => (
  <div
    className={`flex flex-col items-center justify-center min-h-[400px] space-y-6 ${className}`}
  >
    <div className="relative">
      <div className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center">
        {icon ?? <FileX className="w-8 h-8 text-slate-400" />}
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-white">0</span>
      </div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 max-w-md">{description}</p>
    </div>
    {onRetry && (
      <Button
        onClick={onRetry}
        className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        {retryText}
      </Button>
    )}
  </div>
)
