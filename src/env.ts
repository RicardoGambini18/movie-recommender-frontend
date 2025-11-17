import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_COURSE: z.string().optional(),
    NEXT_PUBLIC_PASSWORD_HINT: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_COURSE: process.env.NEXT_PUBLIC_COURSE,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PASSWORD_HINT: process.env.NEXT_PUBLIC_PASSWORD_HINT,
  },
})
