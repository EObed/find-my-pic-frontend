'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
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

export default function EventDetailsPage() {
    const params = useParams()
    const eventId = params.id as string
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const fetchEvent = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/events/${eventId}`)
            if (!response.ok) {
                throw new Error('Failed to fetch event')
            }
            const data = await response.json()

            const formattedEvent = {
                id: data.id,
                name: data.name,
                code: data.code,
                eventDate: data.date || data.eventDate,
                description: data.description || '',
                photosCount: data.photoCount,
                createdAt: data.createdAt,
                images: data.images || [],
            }
            setEvent(formattedEvent)
            setIsEditing(false)
        } catch (err) {
            console.error('Error fetching event:', err)
            setError('Failed to load event details')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {


        fetchEvent()
    }, [eventId])



    if (isLoading) {
        return <Loader />
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-foreground">Error</h1>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    <div className="space-y-4">
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
