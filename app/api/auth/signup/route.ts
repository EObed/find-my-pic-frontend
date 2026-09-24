import { NextResponse } from 'next/server'

import { createSession } from '@/lib/session'
import { validateSignup } from '@/lib/validation'

export async function POST(request: Request) {
    let body: {
        firstName?: unknown
        lastName?: unknown
        email?: unknown
        password?: unknown
        confirmPassword?: unknown
    }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
    const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const confirmPassword =
        typeof body.confirmPassword === 'string' ? body.confirmPassword : ''

    const errors = validateSignup({ firstName, lastName, email, password, confirmPassword })
    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 422 })
    }

    // TODO(auth): create the account with the real auth provider before creating a session.
    const user = { token: 'mock-token', firstName, lastName, email }

    await createSession(user)
    return NextResponse.json({ user })
}
