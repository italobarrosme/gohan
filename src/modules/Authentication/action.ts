'use server'

import { getCustomLog } from '@/utils/logs/logs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

export const AuthGuard = async () => {
  let loggedIn = false

  try {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) loggedIn = true
  } catch (error: any) {
    getCustomLog({
      log: `Error: ${error}`,
      statusCode: error.status,
      type: 'error',
    })
  } finally {
    if (loggedIn) {
      redirect('/dashboard', RedirectType.replace)
    }
  }

  return
}
