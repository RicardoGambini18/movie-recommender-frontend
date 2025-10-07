'use client'

import { CheckSquare, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AlgorithmCheckbox } from '~/components/algorithm-checkbox'
import { DataStructureSection } from '~/components/data-structure-section'
import { EmptyState } from '~/components/empty-state'
import { ErrorState } from '~/components/error-state'
import { HeaderLayout } from '~/components/header'
import { LoadingState } from '~/components/loading-state'
import { Button } from '~/components/ui/button'
import { useAppStore } from '~/lib/app-store'
import { api } from '~/trpc/react'

export default function SortAlgorithmsSelect() {
  const router = useRouter()

  const {
    sortAlgorithms: {
      isAllSelected,
      toggleSelectAll,
      toggleAlgorithm,
      getSelectedCount,
      isAlgorithmSelected,
    },
  } = useAppStore()

  const {
    error,
    refetch,
    isLoading,
    data: dataStructures,
  } = api.movies.getSortDataStructures.useQuery()

  const handleContinue = () => {
    router.push('/dashboard/sort-algorithms/results')
  }

  const buttons = dataStructures && (
    <>
      <Button
        variant="outline"
        onClick={() => toggleSelectAll(dataStructures)}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
      >
        <CheckSquare className="w-4 h-4 mr-2" />
        {isAllSelected(dataStructures)
          ? 'Deseleccionar todos'
          : 'Seleccionar todos'}
      </Button>
      <Button
        onClick={handleContinue}
        disabled={getSelectedCount() === 0}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
      >
        Continuar ({getSelectedCount()})
      </Button>
    </>
  )

  if (isLoading) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Ordenamiento"
        subtitle="Paso 1: Selección de algoritmos"
      >
        <LoadingState
          title="Cargando algoritmos"
          description="Obteniendo la lista de algoritmos disponibles para comparar..."
        />
      </HeaderLayout>
    )
  }

  if (error) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Ordenamiento"
        subtitle="Paso 1: Selección de algoritmos"
      >
        <ErrorState
          onRetry={() => refetch()}
          title="Error al cargar algoritmos"
          description="No se pudieron cargar los algoritmos disponibles. Verifica tu conexión a internet e intenta nuevamente."
        />
      </HeaderLayout>
    )
  }

  if (!dataStructures || dataStructures.length === 0) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Ordenamiento"
        subtitle="Paso 1: Selección de algoritmos"
      >
        <EmptyState
          onRetry={() => refetch()}
          title="No se encontraron algoritmos"
          description="No hay algoritmos disponibles para comparar en este momento. Intenta recargar la página."
        />
      </HeaderLayout>
    )
  }

  return (
    <HeaderLayout
      backUrl="/dashboard"
      rightElement={buttons}
      title="Algoritmos de Ordenamiento"
      subtitle="Paso 1: Selección de algoritmos"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Selecciona los algoritmos a comparar
        </h2>
        <p className="text-slate-400">
          Elige uno o más algoritmos para analizar su rendimiento
        </p>
      </div>
      <div className="space-y-6">
        {dataStructures.map((dataStructure) => (
          <DataStructureSection
            icon={Info}
            key={dataStructure.key}
            name={dataStructure.name}
            description={dataStructure.description}
          >
            {dataStructure.algorithms.map((algorithm) => (
              <AlgorithmCheckbox
                key={algorithm.key}
                algorithm={algorithm}
                onToggle={() =>
                  toggleAlgorithm({
                    algorithmKey: algorithm.key,
                    dataStructureKey: dataStructure.key,
                  })
                }
                isSelected={isAlgorithmSelected({
                  algorithmKey: algorithm.key,
                  dataStructureKey: dataStructure.key,
                })}
              />
            ))}
          </DataStructureSection>
        ))}
      </div>
    </HeaderLayout>
  )
}
