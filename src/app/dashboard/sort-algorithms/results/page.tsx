'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '~/components/error-state'
import { HeaderLayout } from '~/components/header'
import { LoadingState } from '~/components/loading-state'
import { MetricSelect } from '~/components/metric-select'
import { ResultCard } from '~/components/result-card'
import { useAppStore } from '~/lib/app-store'
import { api } from '~/trpc/react'
import { Metric } from '~/types/algorithm-result'

export default function SortAlgorithmsResults() {
  const router = useRouter()
  const [selectedMetric, setSelectedMetric] = useState<Metric>(Metric.TIME)

  const {
    sortAlgorithms: { selectedAlgorithms },
  } = useAppStore()

  const {
    error,
    refetch,
    isLoading,
    data: results,
  } = api.movies.getSortResults.useQuery(
    { algorithms: selectedAlgorithms },
    { enabled: selectedAlgorithms.length > 0 }
  )

  const sortedResults = useMemo(() => {
    if (!results) return []

    return [...results].sort((a, b) => {
      return a.metrics[selectedMetric] - b.metrics[selectedMetric]
    })
  }, [results, selectedMetric])

  useEffect(() => {
    if (selectedAlgorithms.length === 0) {
      router.push('/dashboard/sort-algorithms/select')
    }
  }, [selectedAlgorithms, router])

  if (isLoading) {
    return (
      <HeaderLayout
        title="Algoritmos de Ordenamiento"
        backUrl="/dashboard/sort-algorithms/select"
        subtitle="Paso 2: Comparación de resultados"
      >
        <LoadingState
          title="Procesando algoritmos"
          description="Los algoritmos están siendo ejecutados y comparados. Esto puede tomar hasta un minuto dependiendo de la complejidad."
        />
      </HeaderLayout>
    )
  }

  if (error) {
    return (
      <HeaderLayout
        title="Algoritmos de Ordenamiento"
        backUrl="/dashboard/sort-algorithms/select"
        subtitle="Paso 2: Comparación de resultados"
      >
        <ErrorState
          onRetry={() => refetch()}
          title="Error al procesar algoritmos"
          description="Hubo un problema al ejecutar los algoritmos. Por favor, intenta nuevamente."
        />
      </HeaderLayout>
    )
  }

  return (
    <HeaderLayout
      title="Algoritmos de Ordenamiento"
      backUrl="/dashboard/sort-algorithms/select"
      subtitle="Paso 2: Comparación de resultados"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Resultados de la comparación
          </h2>
          <p className="text-slate-400">
            Comparando {results?.length} algoritmos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MetricSelect
            value={selectedMetric}
            onValueChange={setSelectedMetric}
          />
        </div>
      </div>
      <div className="space-y-4">
        {sortedResults.map((result, index) => (
          <ResultCard
            key={result.algorithm}
            result={result}
            index={index}
            selectedMetric={selectedMetric}
          />
        ))}
      </div>
    </HeaderLayout>
  )
}
