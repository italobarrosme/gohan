import { z } from 'zod'

export const registerSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Must be a valid email address',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6),
})

export type RegisterSchema = z.infer<typeof registerSchema>
