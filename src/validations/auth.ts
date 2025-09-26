import { z } from 'zod'

export const loginSchema = z.object({
  userId: z
    .number({
      required_error: 'El usuario es requerido',
      invalid_type_error: 'El usuario es requerido',
    })
    .min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type LoginInput = z.infer<typeof loginSchema>
