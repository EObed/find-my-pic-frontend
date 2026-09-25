import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventDetailsView } from '@/components/photographer/EventDetailsView'
import { MasonryGallery } from '@/components/photographer/MasonryGallery'
import { getEvent } from '@/lib/api/events'

type EventPageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const event = await getEvent((await params).id)
    return { title: event?.name ?? 'Event not found' }
}

export default async function EventDetailsPage({ params }: EventPageProps) {
    const { id } = await params
    const event = await getEvent(id)

    if (!event) notFound()

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {/* Event Details and Statistics */}
                    <EventDetailsView event={event} />

                    {/* Image Gallery Section */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
                        <h2 className="text-2xl font-bold">Event Gallery</h2>
                        <MasonryGallery images={event.photos} eventName={event.name} />
                    </div>
                </div>
            </div>
        </main>
    )
}
