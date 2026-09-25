import type { Metadata } from 'next'
import { EventForm } from '@/components/photographer/EventForm'

export const metadata: Metadata = { title: 'Create Event' }

export default function CreateEventPage() {
    return <EventForm mode="create" />
}
