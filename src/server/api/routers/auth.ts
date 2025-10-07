import { apiClient } from '~/lib/api-client'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { type User } from '~/types/user'

export const authRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    const { data } = await apiClient.get<User[]>('/users')
    return data
  }),
})
