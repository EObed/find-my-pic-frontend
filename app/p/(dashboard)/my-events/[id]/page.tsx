import type { Metadata } from 'next'
import { headers } from 'next/headers'
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

    // Absolute link guests can open to land on /upload with the code pre-filled.
    const requestHeaders = await headers()
    const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
    const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http'
    const guestLink = `${protocol}://${host}/upload?code=${encodeURIComponent(event.code)}`

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {/* Event Details and Statistics */}
                    <EventDetailsView event={event} guestLink={guestLink} />

                    {/* Image Gallery Section */}
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Gallery</h2>
                                <p className="text-sm text-muted-foreground">
                                    {event.photos.length} photo{event.photos.length === 1 ? '' : 's'} · click any photo to open the viewer
                                </p>
                            </div>
                        </div>
                        <MasonryGallery images={event.photos} eventName={event.name} />
                    </div>
                </div>
            </div>
        </main>
    )
}
