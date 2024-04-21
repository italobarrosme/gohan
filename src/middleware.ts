import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getCustomLog } from './utils/logs/logs'

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    await supabase.auth.getSession()

    getCustomLog({
      log: 'User is authenticated',
      statusCode: 200,
      type: 'info',
    })
  } catch (error: any) {
    getCustomLog({
      log: `Error: ${error}`,
      statusCode: error.status || 500,
      type: 'error',
    })
  }

  return res
}

export const config = {
  matcher: '',
}
