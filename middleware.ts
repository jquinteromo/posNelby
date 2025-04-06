import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  const USER = 'UserRoot'
  const PASS = '@!3212'

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ')
    if (scheme === 'Basic') {
      const buffer = Buffer.from(encoded, 'base64')
      const [user, pass] = buffer.toString().split(':')

      if (user === USER && pass === PASS) {
        return NextResponse.next()
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  })
}
