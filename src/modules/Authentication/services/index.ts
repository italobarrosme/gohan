import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoginSchema, RegisterSchema } from '../Forms'

export const postRegister = async (body: RegisterSchema) => {
  const supabase = createClientComponentClient()

  try {
    const data = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      // options: {
      //   emailRedirectTo: `${location.origin}/api/auth/callback`,
      // },
    })

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const postLogin = async (form: LoginSchema) => {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      return { error }
    }

    return { data, error: null }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const postLogout = async () => {
  const supabase = createClientComponentClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error }
    }

    return { error: null }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
