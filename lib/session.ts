import 'server-only'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

import type IUser from '@/interfaces/IUser'

const secretKey = process.env.SESSION_SECRET

if (!secretKey) {
    throw new Error('SESSION_SECRET is not set. Add it to .env.local (see .env.example).')
}

const encodedKey = new TextEncoder().encode(secretKey)

const COOKIE_NAME = 'session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export type SessionUser = IUser

export interface SessionPayload {
    user: SessionUser
    expiresAt: string
}

export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload as unknown as JWTPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session?: string): Promise<SessionPayload | null> {
    if (!session) return null

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as unknown as SessionPayload
    } catch {
        return null
    }
}

/** Signs the user into an httpOnly cookie. Call from a Route Handler or Server Action. */
export async function createSession(user: SessionUser): Promise<void> {
    const expiresAt = new Date(Date.now() + MAX_AGE_SECONDS * 1000)
    const session = await encrypt({ user, expiresAt: expiresAt.toISOString() })

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    })
}

/** Reads and verifies the current session. Safe to call from Server Components. */
export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    return decrypt(cookieStore.get(COOKIE_NAME)?.value)
}

/** Clears the session cookie. Call from a Route Handler or Server Action. */
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
}
