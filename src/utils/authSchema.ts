import { z } from 'zod'

export const authSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/,
      'Password must contain at least one number, one symbol, and one uppercase letter'
    ),
})

export const signUpSchema = authSchema.required({ name: true })
export const signInSchema = authSchema.omit({ name: true })

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>

export const validateName = ({ value }: { value: string }) => {
  const result = authSchema.shape.name.safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}

export const validateEmail = ({ value }: { value: string }) => {
  const result = authSchema.shape.email.safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}

export const validatePassword = ({ value }: { value: string }) => {
  const result = authSchema.shape.password.safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}
