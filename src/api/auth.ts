import { apiClient } from '~/lib/api-client'
import { Auth } from '~/types/auth'
import { type User } from '~/types/user'
import { LoginInput } from '~/validations/auth'

export const getUsers = async () => {
  const { data } = await apiClient.get<User[]>('/users')
  return data
}

export const login = async (input: LoginInput) => {
  const { data } = await apiClient.post<Auth>('/users/login', {
    user_id: input.userId,
    password: input.password,
  })
  return data
}
