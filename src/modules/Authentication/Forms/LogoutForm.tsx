'use client'

import { Button } from '@/shared/components/Button'
import { postLogout } from '../services'
import { useToast } from '@/shared/components/Toast'
import { useRouter } from 'next/navigation'

export const LogoutForm = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const logout = async () => {
    try {
      const { error } = await postLogout()

      if (error) {
        toast({
          title: 'Erro ao enviar os dados',
          description: `${error.message}`,
          status: 'error',
        })
      }

      toast({
        title: 'User logged out successfully!',
        description: 'Goodbye!',
        status: 'success',
      })

      push('/login')
    } catch (error) {
      toast({
        title: 'Erro ao enviar os dados',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  return (
    <Button variant="primary" onClick={logout} icon="bi:box-arrow-right">
      Logout
    </Button>
  )
}
