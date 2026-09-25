import { NextResponse, type NextRequest } from 'next/server'

import { SESSION_COOKIE_NAME, decrypt } from '@/lib/session'

const DASHBOARD_HOME = '/p/my-events'
const AUTH_PAGES = ['/p/login', '/p/signup']

/**
 * Optimistic session check before rendering: bounce signed-out users away from the dashboard
 * and signed-in users away from the auth pages. The dashboard layout still verifies the
 * session itself, and each server action checks it again.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const session = await decrypt(request.cookies.get(SESSION_COOKIE_NAME)?.value)

    if (AUTH_PAGES.includes(pathname)) {
        return session ? NextResponse.redirect(new URL(DASHBOARD_HOME, request.url)) : NextResponse.next()
    }

    if (!session) {
        const response = NextResponse.redirect(new URL('/p/login', request.url))
        // Drop an expired or tampered cookie so it is not re-checked on every request.
        response.cookies.delete(SESSION_COOKIE_NAME)
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/p/my-events/:path*', '/p/login', '/p/signup'],
}
