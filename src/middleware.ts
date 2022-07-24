import { NextRequest, NextResponse } from 'next/server'

const shouldIgnorePath = (path: string) => {
  return (
    path === '/' ||
    ['/_next', '/favicon', '/api'].some((p) => path.startsWith(p))
  )
}

export async function middleware(req: NextRequest) {
  if (
    shouldIgnorePath(req.nextUrl.pathname) ||
    req.headers.get('x-middleware-preflight')
  )
    return

  const slug = req.nextUrl.pathname.split('/').pop()
  const res = await fetch(`${req.nextUrl.origin}/api/${slug}`)

  if (res.status === 200) {
    const data = await res.json()
    return NextResponse.redirect(data.link)
  }
}
