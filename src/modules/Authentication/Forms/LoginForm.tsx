'use client'

import { Input } from '@/shared/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/components/Toast'
import { LoginSchema, loginSchema } from './schemas'
import { postLogin } from '../services'
import { useRouter } from 'next/navigation'
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { toast } = useToast()
  const { push } = useRouter()

  async function sendForm(form: LoginSchema) {
    try {
      const { data, error } = await postLogin(form)

      if (error) {
        toast({
          title: 'Erro ao enviar os dados',
          description: `${error.message}`,
          status: 'error',
        })
      }

      if (data) {
        toast({
          title: 'User logged in successfully!',
          description: 'Welcome! the application!',
          status: 'success',
        })
        reset()

        push('/dashboard')
      }
    } catch (error) {
      toast({
        title: 'Erro ao enviar os dados',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-4"
      onSubmit={handleSubmit((form) => {
        sendForm(form)
      })}
    >
      <fieldset>
        <legend className="text-xl font-bold">Login</legend>
      </fieldset>
      <Input
        label="Email"
        hasError={!!errors.email}
        placeholder="email@email.com"
        errorMessage={errors.email?.message}
        required
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password')}
      />

      <div className="flex w-full flex-row-reverse">
        <Button type="submit" className="my-2">
          Login
        </Button>
      </div>
    </form>
  )
}
