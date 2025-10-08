'use client'

import { ArrowRight, CheckSquare, Info, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AlgorithmCheckbox } from '~/components/algorithm-checkbox'
import { DataStructureSection } from '~/components/data-structure-section'
import { EmptyState } from '~/components/empty-state'
import { ErrorState } from '~/components/error-state'
import { HeaderLayout } from '~/components/header-layout'
import { LoadingState } from '~/components/loading-state'
import { Button } from '~/components/ui/button'
import { useAppStore } from '~/lib/app-store'
import { api } from '~/trpc/react'

export default function SearchAlgorithmsSelectAlgorithms() {
  const router = useRouter()

  const {
    toggleAlgorithm,
    selectedMovieIds,
    isAlgorithmSelected,
    isAllAlgorithmsSelected,
    toggleSelectAllAlgorithms,
    getSelectedAlgorithmsCount,
  } = useAppStore((state) => state.searchAlgorithms)

  const {
    error,
    refetch,
    isLoading,
    data: dataStructures,
  } = api.movies.getSearchDataStructures.useQuery()

  const handleContinue = () => {
    router.push(`/dashboard/search-algorithms/results`)
  }

  const buttons = dataStructures && (
    <>
      <Button
        variant="outline"
        onClick={() => toggleSelectAllAlgorithms(dataStructures)}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
      >
        {isAllAlgorithmsSelected(dataStructures) ? (
          <CheckSquare className="w-4 h-4" />
        ) : (
          <Square className="w-4 h-4" />
        )}
        {isAllAlgorithmsSelected(dataStructures) ? (
          <span className="hidden md:inline">Deseleccionar todos</span>
        ) : (
          <span className="hidden md:inline">Seleccionar todos</span>
        )}
      </Button>
      <Button
        onClick={handleContinue}
        disabled={getSelectedAlgorithmsCount() === 0}
        title="Continuar con los algoritmos seleccionados"
        className="bg-yellow-400 hover:bg-yellow-500 gap-1 text-black font-semibold"
      >
        <span className="hidden md:inline">Continuar</span>
        <span>({getSelectedAlgorithmsCount()})</span>
        <ArrowRight className="w-4 h-4 block md:hidden" />
      </Button>
    </>
  )

  useEffect(() => {
    if (selectedMovieIds.length === 0) {
      router.push('/dashboard/search-algorithms/select-movies')
    }
  }, [selectedMovieIds, router])

  if (isLoading) {
    return (
      <HeaderLayout
        title="Algoritmos de Búsqueda"
        subtitle="Paso 2: Selección de algoritmos"
        backUrl="/dashboard/search-algorithms/select-movies"
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
        title="Algoritmos de Búsqueda"
        subtitle="Paso 2: Selección de algoritmos"
        backUrl="/dashboard/search-algorithms/select-movies"
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
        title="Algoritmos de Búsqueda"
        subtitle="Paso 2: Selección de algoritmos"
        backUrl="/dashboard/search-algorithms/select-movies"
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
      rightElement={buttons}
      title="Algoritmos de Búsqueda"
      subtitle="Paso 2: Selección de algoritmos"
      backUrl="/dashboard/search-algorithms/select-movies"
    >
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
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
