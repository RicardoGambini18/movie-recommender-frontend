'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { EmptyState } from '~/components/empty-state'
import { ErrorState } from '~/components/error-state'
import { HeaderLayout } from '~/components/header-layout'
import { LoadingState } from '~/components/loading-state'
import { Button } from '~/components/ui/button'

import { SortedMovieCheckbox } from './components/sorted-movie-checkbox'
import { SortedMoviesFilter } from './components/sorted-movies-filter'
import { useSelectMovies } from './hooks/use-select-movies'

export default function SearchAlgorithmsSelectMovies() {
  const router = useRouter()

  const {
    error,
    movies,
    refetch,
    isLoading,
    virtualizer,
    ITEM_HEIGHT,
    toggleMovie,
    virtualItems,
    containerRef,
    jumpToPosition,
    isMovieSelected,
    scrollToPosition,
    setJumpToPosition,
    handleJumpToPosition,
    getSelectedMoviesCount,
  } = useSelectMovies()

  const handleContinue = () => {
    router.push(`/dashboard/search-algorithms/select-algorithms`)
  }

  const buttons = (
    <Button
      onClick={handleContinue}
      disabled={getSelectedMoviesCount() === 0}
      title="Continuar con las películas seleccionadas"
      className="bg-yellow-400 hover:bg-yellow-500 gap-1 text-black font-semibold"
    >
      <span className="hidden md:inline">Continuar</span>
      <span>({getSelectedMoviesCount()})</span>
      <ArrowRight className="w-4 h-4 block md:hidden" />
    </Button>
  )

  if (isLoading) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Búsqueda"
        subtitle="Paso 1: Selección de películas"
      >
        <LoadingState
          title="Cargando películas"
          description="Obteniendo la lista ordenada de películas disponibles..."
        />
      </HeaderLayout>
    )
  }

  if (error) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Búsqueda"
        subtitle="Paso 1: Selección de películas"
      >
        <ErrorState
          onRetry={() => refetch()}
          title="Error al cargar películas"
          description="No se pudieron cargar las películas disponibles. Verifica tu conexión a internet e intenta nuevamente."
        />
      </HeaderLayout>
    )
  }

  if (movies?.length === 0) {
    return (
      <HeaderLayout
        backUrl="/dashboard"
        title="Algoritmos de Búsqueda"
        subtitle="Paso 1: Selección de películas"
      >
        <EmptyState
          onRetry={() => refetch()}
          title="No se encontraron películas"
          description="No hay películas disponibles para seleccionar. Intenta recargar la página."
        />
      </HeaderLayout>
    )
  }

  return (
    <HeaderLayout
      backUrl="/dashboard"
      rightElement={buttons}
      title="Algoritmos de Búsqueda"
      subtitle="Paso 1: Selección de películas"
    >
      <SortedMoviesFilter
        jumpToPosition={jumpToPosition}
        maxPosition={movies?.length ?? 0}
        onJumpToPosition={handleJumpToPosition}
        onJumpToPositionChange={setJumpToPosition}
        onScrollToEnd={() => scrollToPosition('end')}
        onScrollToStart={() => scrollToPosition('start')}
        onScrollToMiddle={() => scrollToPosition('middle')}
      />
      <div
        ref={containerRef}
        style={{ contain: 'strict' }}
        className="h-[calc(100vh-233px)] overflow-y-auto pr-2"
      >
        <div
          style={{
            width: '100%',
            position: 'relative',
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualItems.map((virtualItem) => {
            const movie = movies?.[virtualItem.index]
            if (!movie) return null

            return (
              <div
                key={movie.id}
                style={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  position: 'absolute',
                  height: `${ITEM_HEIGHT}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <SortedMovieCheckbox
                  movie={movie}
                  onToggle={toggleMovie}
                  index={virtualItem.index}
                  isSelected={isMovieSelected(movie.id)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </HeaderLayout>
  )
}
