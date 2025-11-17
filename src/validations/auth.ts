import { z } from 'zod'

export const loginSchema = z.object({
  userId: z
    .number({ error: 'El usuario es requerido' })
    .min(1, { message: 'El usuario es requerido' }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
})

export type LoginInput = z.infer<typeof loginSchema>
