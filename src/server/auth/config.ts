import { type DefaultSession, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { env } from '~/env'
import { apiClient } from '~/lib/api-client'
import { type User } from '~/types/user'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        userId: { type: 'number' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          return null
        }

        if (credentials.password !== env.AUTH_PASSWORD) {
          return null
        }

        try {
          const userId = Number(credentials.userId)
          const { data: userData } = await apiClient.get<User>(
            `/users/${userId}`
          )

          return {
            id: userData.id.toString(),
            name: userData.name,
            email: userData.email,
            image: userData.image,
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
} satisfies NextAuthConfig
