'use client'

import { useState } from 'react'
import { EventsTable } from '@/components/photographer/EventsTable'
import { DeleteEventDialog } from '@/components/photographer/DeleteEventDialog'
import IEvent from '@/interfaces/Event'

/** Client island for the server-rendered My Events page: owns only the delete-dialog state. */
export function MyEventsContent({ events }: { events: IEvent[] }) {
    const [eventToDelete, setEventToDelete] = useState<IEvent | null>(null)

    return (
        <>
            <EventsTable events={events} onDelete={setEventToDelete} />

            <DeleteEventDialog
                open={eventToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setEventToDelete(null)
                }}
                event={eventToDelete}
            />
        </>
    )
}
