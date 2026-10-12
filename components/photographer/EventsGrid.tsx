'use client'

import Link from 'next/link'
import { CalendarDays, ImageOff, Images, Trash2 } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { EventsEmptyState, StatusPill, formatEventDate } from '@/components/photographer/EventsTable'
import IEvent from '@/interfaces/Event'

interface EventsGridProps {
    events: IEvent[]
    onDelete: (event: IEvent) => void
}

/** Card view of events, each led by its cover photo. */
export function EventsGrid({ events, onDelete }: EventsGridProps) {
    if (events.length === 0) return <EventsEmptyState />

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
                <article
                    key={event.id}
                    style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-24px_color-mix(in_oklch,var(--primary),transparent_40%)]"
                >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {event.photos.length > 0 ? (
                            <div className="grid h-full grid-cols-3 gap-0.5">
                                {/* eslint-disable-next-line @next/next/no-img-element -- remote cover photo */}
                                <img src={event.photos[0].file} alt="" loading="lazy" className="col-span-2 row-span-2 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="grid grid-rows-2 gap-0.5">
                                    {event.photos.slice(1, 3).map((photo) => (
                                        // eslint-disable-next-line @next/next/no-img-element -- remote cover photo
                                        <img key={photo.id} src={photo.file} alt="" loading="lazy" className="h-full w-full object-cover" />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <ImageOff className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                        )}
                        <div className="absolute top-3 left-3">
                            <span className="glass rounded-full">
                                <StatusPill status={event.status} />
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onDelete(event)}
                            className="glass absolute top-3 right-3 z-10 rounded-full p-2 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-destructive focus-visible:opacity-100"
                            aria-label={`Delete ${event.name}`}
                            title="Delete event"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-3 p-5">
                        <Link href={`/p/my-events/${event.id}`} className="block after:absolute after:inset-0">
                            <h3 className="truncate text-lg font-semibold transition-colors group-hover:text-primary">{event.name}</h3>
                        </Link>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="h-4 w-4" />
                                {formatEventDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Images className="h-4 w-4" />
                                {event.photoCount}
                            </span>
                        </div>
                        <div className="relative z-10 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
                            <span className="text-xs text-muted-foreground">Event code</span>
                            <CopyButton value={event.code} label={`Copy code ${event.code}`} message={`Copied ${event.code}`} className="font-mono text-sm text-foreground">
                                {event.code}
                            </CopyButton>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
