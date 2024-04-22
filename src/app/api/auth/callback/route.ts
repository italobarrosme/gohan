import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { getCustomLog } from '@/utils/logs/logs'

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return Response.redirect('/')
  }

  try {
    const supabase = createRouteHandlerClient({ cookies })

    await supabase.auth.exchangeCodeForSession(code)
  } catch (error: any) {
    getCustomLog({
      log: `Error: ${error}`,
      statusCode: error.status,
      type: 'error',
    })
  }

  return NextResponse.redirect(requestUrl.origin)
}
