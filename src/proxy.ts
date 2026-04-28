import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: replace with real Firebase auth check in production
export function proxy(request: NextRequest) {
  void request
  return NextResponse.next()
}

export const config = {
  matcher: ['/feed/:path*', '/tools/:path*', '/profile/:path*', '/settings/:path*'],
}
