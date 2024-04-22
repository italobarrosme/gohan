'use client'

import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/components/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from './schemas'
import { postRegister } from '../services'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const RegisterForm = () => {
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
  const [isLoading, setIsLoading] = useState(false)

  async function sendForm(form: LoginSchema) {
    setIsLoading(true)
    try {
      const { data, error } = await postRegister(form)

      if (error) {
        toast({
          title: 'Erro ao enviar os dados',
          description: `${error.message}`,
          status: 'error',
        })
      }

      if (data.user) {
        toast({
          title: 'User registered successfully!',
          description: 'Crongratulations! Confirm your email to continue.',
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        sendForm(data)
      })}
    >
      <fieldset>
        <legend className="text-xl font-bold">Register</legend>
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
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </div>
    </form>
  )
}
