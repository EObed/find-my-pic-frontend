'use server'

import { revalidatePath } from 'next/cache'

import type { ActionResult } from '@/interfaces/ActionResult'
import type { EventInput } from '@/interfaces/Event'
import * as eventsApi from '@/lib/api/events'
import { getSession } from '@/lib/session'
import type { FieldErrors } from '@/lib/validation'

const SIGNED_OUT: ActionResult<never> = { ok: false, message: 'Your session has expired. Please sign in again.' }

function validateEvent(input: EventInput): FieldErrors {
    const errors: FieldErrors = {}
    if (!input.name.trim()) errors.name = 'Event name is required'
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.eventDate = 'Event date is required'
    return errors
}

function normalize(input: EventInput): EventInput {
    return {
        name: input.name.trim(),
        code: input.code.trim().toUpperCase(),
        date: input.date,
        description: input.description.trim(),
    }
}

// Photos are not sent here: server action bodies are capped at 1 MB, so gallery uploads
// should go straight to storage once the backend exists (checklist section 3).

export async function createEventAction(input: EventInput): Promise<ActionResult<{ id: string }>> {
    if (!(await getSession())) return SIGNED_OUT

    const errors = validateEvent(input)
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const event = await eventsApi.createEvent(normalize(input))
    revalidatePath('/p/my-events')
    return { ok: true, data: { id: event.id } }
}

export async function updateEventAction(id: string, input: EventInput): Promise<ActionResult<{ id: string }>> {
    if (!(await getSession())) return SIGNED_OUT

    const errors = validateEvent(input)
    if (Object.keys(errors).length > 0) return { ok: false, errors }

    const event = await eventsApi.updateEvent(id, normalize(input))
    if (!event) return { ok: false, message: 'This event no longer exists.' }

    revalidatePath('/p/my-events')
    revalidatePath(`/p/my-events/${id}`)
    return { ok: true, data: { id: event.id } }
}

export async function deleteEventAction(id: string): Promise<ActionResult> {
    if (!(await getSession())) return SIGNED_OUT

    const deleted = await eventsApi.deleteEvent(id)
    if (!deleted) return { ok: false, message: 'This event no longer exists.' }

    revalidatePath('/p/my-events')
    return { ok: true, data: undefined }
}
