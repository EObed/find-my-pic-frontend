import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventForm } from '@/components/photographer/EventForm'
import { getEvent } from '@/lib/api/events'

export const metadata: Metadata = { title: 'Edit Event' }

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const event = await getEvent(id)

    if (!event) notFound()

    return <EventForm mode="edit" event={event} />
}
