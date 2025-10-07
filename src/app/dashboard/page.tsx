import { BarChart3 } from 'lucide-react'
import { HeaderLayout } from '~/components/header'

import { ModuleCard } from './components/module-card'

export default function Dashboard() {
  return (
    <HeaderLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
        <p className="text-slate-400">Selecciona un módulo para comenzar</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ModuleCard
          icon={BarChart3}
          title="Algoritmos de Ordenamiento"
          href="/dashboard/sort-algorithms/select"
          details="Selecciona algoritmos, ejecuta pruebas y analiza resultados"
          description="Compara el rendimiento de diferentes algoritmos de ordenamiento"
        />
      </div>
    </HeaderLayout>
  )
}
