'use server'

import { redirect } from 'next/navigation'

import type { ActionResult } from '@/interfaces/ActionResult'
import { createSession, deleteSession } from '@/lib/session'
import { validateLogin, validateSignup } from '@/lib/validation'

export async function login(input: { email: string; password: string }): Promise<ActionResult> {
    const email = input.email.trim()
    const errors = validateLogin({ email, password: input.password })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    // TODO(auth): verify credentials against the real auth provider before creating a session.
    const displayName = email
        .split('@')[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

    await createSession({
        token: 'mock-token',
        firstName: displayName || 'Photographer',
        lastName: '',
        email,
    })
    return { ok: true, data: undefined }
}

export async function signup(input: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}): Promise<ActionResult> {
    const firstName = input.firstName.trim()
    const lastName = input.lastName.trim()
    const email = input.email.trim()
    const errors = validateSignup({ ...input, firstName, lastName, email })
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    // TODO(auth): create the account with the real auth provider before creating a session.
    await createSession({ token: 'mock-token', firstName, lastName, email })
    return { ok: true, data: undefined }
}

export async function logout(): Promise<never> {
    await deleteSession()
    redirect('/p')
}
