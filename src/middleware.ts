import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getCustomLog } from './utils/logs/logs'

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session && req.nextUrl.pathname !== '/') {
      req.nextUrl.pathname = '/'
      return NextResponse.redirect(req.nextUrl)
    }

    if (session && req.nextUrl.pathname === '/') {
      req.nextUrl.pathname = '/dashboard'
      return NextResponse.redirect(req.nextUrl)
    }
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
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
