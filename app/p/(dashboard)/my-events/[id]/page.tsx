'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import {EventForm} from "@/components/photographer/EventForm";
import {Loader} from "@/components/Loader";
import {EventDetailsView} from "@/components/photographer/EventDetailsView";
import {MasonryGallery} from "@/components/photographer/MasonryGallery";
import {Photo} from "@/interfaces/Photo";


interface Event {
    id: string
    name: string
    code: string
    eventDate: string
    description: string
    photosCount: number
    createdAt?: string | Date
    images?: Photo[]
}

const generateMockEvent = (eventId: string): Event => {
    return {
        id: eventId,
        name: "Wedding - Johnson & Smith",
        code: "WED2024001",
        eventDate: "2024-06-15",
        description: "Outdoor wedding ceremony and reception at the Grand Garden",
        photosCount: 8,
        createdAt: new Date("2024-05-01"),
        images: [
            { id: "p1", title: "Ceremony", file: "https://picsum.photos/seed/wed1/600/800" },
            { id: "p2", title: "Reception", file: "https://picsum.photos/seed/wed2/600/400" },
            { id: "p3", title: "First Dance", file: "https://picsum.photos/seed/wed3/600/600" },
            { id: "p4", title: "Toast", file: "https://picsum.photos/seed/wed4/600/900" },
            { id: "p5", title: "Cake", file: "https://picsum.photos/seed/wed5/600/450" },
            { id: "p6", title: "Guests", file: "https://picsum.photos/seed/wed6/600/700" },
            { id: "p7", title: "Bouquet", file: "https://picsum.photos/seed/wed7/600/500" },
            { id: "p8", title: "Send-off", file: "https://picsum.photos/seed/wed8/600/650" },
        ],
    }
}

export default function EventDetailsPage() {
    const params = useParams()
    const eventId = params.id as string
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const fetchEvent = () => {
        setIsLoading(true)
        setTimeout(() => {
            try {
                setEvent(generateMockEvent(eventId))
                setIsEditing(false)
            } catch (err) {
                console.error('Error fetching event:', err)
                setError('Failed to load event details')
            } finally {
                setIsLoading(false)
            }
        }, 1000)
    }

    useEffect(() => {
        fetchEvent()
    }, [eventId])



    if (isLoading) {
        return <Loader />
    }

    if (error || !event) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="space-y-4 text-center animate-in fade-in zoom-in-95 duration-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                    <p className="text-foreground/60">{error || 'Event not found'}</p>
                </div>
            </div>
        )
    }

    if (isEditing) {
        return (
            <EventForm
                mode="edit"
                eventId={eventId}
                initialData={{
                    name: event.name,
                    code: event.code,
                    eventDate: event.eventDate,
                    description: event.description,
                    images: event.images || [],
                }}
                onCancel={() => setIsEditing(false)}

            />
        )
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {/* Event Details and Statistics */}
                    <EventDetailsView
                        event={{
                            id: event.id,
                            name: event.name,
                            code: event.code,
                            eventDate: event.eventDate,
                            description: event.description,
                            photoCount: event.photosCount,
                            createdAt: event.createdAt,
                        }}
                        onEdit={() => setIsEditing(true)}
                    />

                    {/* Image Gallery Section */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
                        <h2 className="text-2xl font-bold">Event Gallery</h2>
                        <MasonryGallery
                            images={event.images || []}
                            eventName={event.name}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
