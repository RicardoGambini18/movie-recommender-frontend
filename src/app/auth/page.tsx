import { LoginForm } from './components/login-form'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-lg mb-4">
            <span className="text-black font-bold text-xl">IMDb</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bienvenido de Vuelta
          </h1>
          <p className="text-slate-400">
            Inicia sesión en tu base de datos de películas
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
