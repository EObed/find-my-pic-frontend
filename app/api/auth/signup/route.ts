import { NextResponse } from 'next/server'

import { createSession } from '@/lib/session'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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

    const errors: Record<string, string> = {}
    if (!firstName) errors.firstName = 'First name is required'
    if (!lastName) errors.lastName = 'Last name is required'
    if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address'
    if (password.length < 6) errors.password = 'Password must be at least 6 characters'
    if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match'
    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 422 })
    }

    // TODO(auth): create the account with the real auth provider before creating a session.
    const user = { token: 'mock-token', firstName, lastName, email }

    await createSession(user)
    return NextResponse.json({ user })
}
