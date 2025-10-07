import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface ErrorStateProps {
  title?: string
  retryText?: string
  className?: string
  onRetry?: () => void
  description?: string
}

export const ErrorState = ({
  onRetry,
  className = '',
  retryText = 'Reintentar',
  title = 'Error al procesar',
  description = 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.',
}: ErrorStateProps) => (
  <div
    className={`flex flex-col items-center justify-center min-h-[400px] space-y-6 ${className}`}
  >
    <div className="relative">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-white">!</span>
      </div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 max-w-md">{description}</p>
    </div>
    {onRetry && (
      <Button
        onClick={onRetry}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        {retryText}
      </Button>
    )}
  </div>
)
