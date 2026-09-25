import 'server-only'

import type IEvent from '@/interfaces/Event'
import type { EventInput } from '@/interfaces/Event'

// TODO(api): replace the in-memory store with backend requests. Page and action call sites
// depend only on these function signatures, so they will not need to change.

const MOCK_LATENCY_MS = 600

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

const galleryPhotos = (seed: string, count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: `${seed}-${i + 1}`,
        title: `Photo ${i + 1}`,
        // Varying heights keep the masonry gallery looking realistic.
        file: `https://picsum.photos/seed/${seed}${i + 1}/600/${[800, 400, 600, 900, 450, 700, 500, 650][i % 8]}`,
    }))

// Module-level so mutations persist for the lifetime of the dev server process.
let events: IEvent[] = [
    {
        id: '1',
        name: 'Wedding - Johnson & Smith',
        date: '2024-06-15',
        code: 'WED2024001',
        description: 'Outdoor wedding ceremony and reception at the Grand Garden',
        status: 'active',
        photoCount: 8,
        createdAt: '2024-05-01T10:00:00.000Z',
        photos: galleryPhotos('wed', 8),
    },
    {
        id: '2',
        name: "Birthday - Sarah's 30th",
        date: '2024-07-20',
        code: 'BDAY2024002',
        description: 'Surprise birthday party with friends and family',
        status: 'active',
        photoCount: 4,
        createdAt: '2024-06-10T10:00:00.000Z',
        photos: galleryPhotos('bday', 4),
    },
    {
        id: '3',
        name: 'Corporate Event - Tech Conference 2024',
        date: '2024-08-05',
        code: 'CORP2024003',
        description: 'Annual technology conference with keynote speakers',
        status: 'inactive',
        photoCount: 6,
        createdAt: '2024-07-01T10:00:00.000Z',
        photos: galleryPhotos('corp', 6),
    },
    {
        id: '4',
        name: 'Graduation - Class of 2024',
        date: '2024-09-10',
        code: 'GRAD2024004',
        description: 'University graduation ceremony',
        status: 'active',
        photoCount: 5,
        createdAt: '2024-08-15T10:00:00.000Z',
        photos: galleryPhotos('grad', 5),
    },
    {
        id: '5',
        name: 'Family Reunion',
        date: '2024-10-12',
        code: 'FAM2024005',
        description: 'Annual family gathering at the lake house',
        status: 'inactive',
        photoCount: 0,
        createdAt: '2024-09-20T10:00:00.000Z',
        photos: [],
    },
]

/** All events for the signed-in photographer. Throws on failure — the route's error.tsx handles it. */
export async function getEvents(): Promise<IEvent[]> {
    await wait()
    return events
}

/** One event, or null when it does not exist (the page turns that into notFound()). */
export async function getEvent(id: string): Promise<IEvent | null> {
    await wait()
    return events.find((event) => event.id === id) ?? null
}

export async function createEvent(input: EventInput): Promise<IEvent> {
    await wait()
    const id = String(Math.max(0, ...events.map((event) => Number(event.id) || 0)) + 1)
    const event: IEvent = {
        id,
        ...input,
        code: input.code || `EVT${new Date().getFullYear()}${id.padStart(3, '0')}`,
        status: 'active',
        photoCount: 0,
        createdAt: new Date().toISOString(),
        photos: [],
    }
    events = [...events, event]
    return event
}

export async function updateEvent(id: string, input: EventInput): Promise<IEvent | null> {
    await wait()
    const existing = events.find((event) => event.id === id)
    if (!existing) return null

    const updated: IEvent = { ...existing, ...input, code: input.code || existing.code }
    events = events.map((event) => (event.id === id ? updated : event))
    return updated
}

/** Returns false when the event does not exist. */
export async function deleteEvent(id: string): Promise<boolean> {
    await wait()
    const exists = events.some((event) => event.id === id)
    events = events.filter((event) => event.id !== id)
    return exists
}
