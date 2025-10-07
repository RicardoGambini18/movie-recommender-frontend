import { z } from 'zod'
import { apiClient } from '~/lib/api-client'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { type AlgorithmResult } from '~/types/algorithm-result'
import { type DataStructure } from '~/types/data-structure'

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

      const results: AlgorithmResult[] = []

      for (const { algorithmKey, dataStructureKey } of algorithms) {
        const { data } = await apiClient.get<AlgorithmResult>('/movies/sort', {
          params: {
            algorithm_key: algorithmKey,
            data_structure_key: dataStructureKey,
          },
        })

        results.push(data)
      }

      return results
    }),
})
