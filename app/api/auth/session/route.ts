import { NextResponse } from 'next/server'

import { deleteSession, getSession } from '@/lib/session'

/** Returns the current signed-in photographer, or 401 if there is no session. */
export async function GET() {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ user: null }, { status: 401 })
    }
    return NextResponse.json({ user: session.user })
}

/** Logs the photographer out by clearing the session cookie. */
export async function DELETE() {
    await deleteSession()
    return NextResponse.json({ ok: true })
}
