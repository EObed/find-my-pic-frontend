import { NextResponse } from 'next/server'

import { createSession } from '@/lib/session'
import { validateLogin } from '@/lib/validation'

export async function POST(request: Request) {
    let body: { email?: unknown; password?: unknown }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    const errors = validateLogin({ email, password })
    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 422 })
    }

    // TODO(auth): verify credentials against the real auth provider before creating a session.
    const displayName = email
        .split('@')[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

    const user = {
        token: 'mock-token',
        firstName: displayName || 'Photographer',
        lastName: '',
        email,
    }

    await createSession(user)
    return NextResponse.json({ user })
}
