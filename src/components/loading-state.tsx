interface LoadingStateProps {
  title?: string
  className?: string
  description?: string
}

export const LoadingState = ({
  className = '',
  title = 'Procesando...',
  description = 'Por favor espera mientras procesamos tu solicitud.',
}: LoadingStateProps) => (
  <div
    className={`flex flex-col items-center justify-center min-h-[400px] space-y-6 ${className}`}
  >
    <div className="relative">
      <div className="w-16 h-16 border-4 border-slate-700 border-t-yellow-400 rounded-full animate-spin"></div>
      <div
        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin"
        style={{ animationDelay: '0.15s' }}
      ></div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 max-w-md">{description}</p>
    </div>
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  </div>
)
