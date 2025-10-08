import { z } from 'zod'
import { apiClient } from '~/lib/api-client'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { type AlgorithmResult } from '~/types/algorithm-result'
import { type DataStructure } from '~/types/data-structure'
import { type Movie } from '~/types/movie'

export const moviesRouter = createTRPCRouter({
  getSortDataStructures: protectedProcedure.query(async () => {
    const { data } = await apiClient.get<DataStructure[]>(
      '/movies/sort/data-structures'
    )

    return data
  }),
  getSortResults: protectedProcedure
    .input(
      z.object({
        algorithms: z.array(
          z.object({
            algorithmKey: z.string(),
            dataStructureKey: z.string(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const { algorithms } = input

      if (algorithms.length === 0) {
        return []
      }

      const results: AlgorithmResult<Movie>[] = []

      for (const { algorithmKey, dataStructureKey } of algorithms) {
        const { data } = await apiClient.get<AlgorithmResult<Movie>>(
          '/movies/sort',
          {
            params: {
              algorithm_key: algorithmKey,
              data_structure_key: dataStructureKey,
            },
          }
        )

        results.push(data)
      }

      return results
    }),
  getMovies: protectedProcedure.query(async () => {
    const { data } = await apiClient.get<Movie[]>('/movies')
    return data
  }),
  getSearchDataStructures: protectedProcedure.query(async () => {
    const { data } = await apiClient.get<DataStructure[]>(
      '/movies/search/data-structures'
    )

    return data
  }),
  getSearchResults: protectedProcedure
    .input(
      z.object({
        movieIds: z.array(z.number()),
        algorithms: z.array(
          z.object({
            algorithmKey: z.string(),
            dataStructureKey: z.string(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const { movieIds, algorithms } = input

      if (movieIds.length === 0 || algorithms.length === 0) {
        return []
      }

      const results: AlgorithmResult<Movie>[] = []

      for (const { algorithmKey, dataStructureKey } of algorithms) {
        const subResults: AlgorithmResult<Movie>[] = []

        for (const movieId of movieIds) {
          const { data } = await apiClient.get<AlgorithmResult<Movie>>(
            '/movies/search',
            {
              params: {
                movie_id: movieId,
                algorithm_key: algorithmKey,
                data_structure_key: dataStructureKey,
              },
            }
          )

          subResults.push(data)
        }

        if (subResults.length === 0) continue

        const averageTime =
          subResults.reduce((acc, curr) => acc + curr.metrics.time, 0) /
          subResults.length

        const averageMemory =
          subResults.reduce((acc, curr) => acc + curr.metrics.memory, 0) /
          subResults.length

        const averageComparisons =
          subResults.reduce((acc, curr) => acc + curr.metrics.comparisons, 0) /
          subResults.length

        results.push({
          ...subResults[0]!,
          sub_metrics: subResults.map((result) => ({
            ...result.metrics,
            item_found_index: result.item_found_index,
          })),
          metrics: {
            time: averageTime,
            memory: averageMemory,
            comparisons: averageComparisons,
          },
        })
      }

      return results
    }),
})
