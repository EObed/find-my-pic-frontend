'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, FileText, Images, CheckCircle, AlertCircle, Pencil } from 'lucide-react'

interface EventDetailsViewProps {
    event: {
        id: string
        name: string
        code: string
        eventDate: string
        description: string
        photoCount: number
        createdAt?: string | Date
    }
    onEdit: () => void
}

export function EventDetailsView({ event, onEdit }: EventDetailsViewProps) {
    // Mock statistics - in production these would come from the backend.
    // Derived deterministically from the event id so renders stay stable (no Math.random during render).
    const { attemptedMatches, successfulMatches, successRate } = useMemo(() => {
        const seed = event.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const attempted = (seed * 37) % 500 + 100
        const successful = Math.floor(attempted * 0.65)
        const rate = Math.round((successful / attempted) * 100)
        return { attemptedMatches: attempted, successfulMatches: successful, successRate: rate }
    }, [event.id])

    const formatDate = (date: string | Date | undefined) => {
        if (!date) return 'N/A'
        const dateObj = typeof date === 'string' ? new Date(date) : date
        return dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <div className="space-y-8">
            {/* Header with Edit Button */}
            <div className="flex flex-col items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-balance sm:text-4xl">{event.name}</h1>
                    <p className="mt-1 text-foreground/60">Event Gallery</p>
                </div>
                <Button
                    onClick={onEdit}
                    className="w-full shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:w-auto"
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Event
                </Button>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Event Information Card */}
                <div className="card-lift space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 fill-mode-both">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <FileText className="h-5 w-5 text-primary" />
                        Event Information
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-foreground/60">Event Code</p>
                            <p className="font-mono text-lg font-semibold text-primary">{event.code}</p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-sm text-foreground/60">
                                <Calendar className="h-4 w-4" />
                                Event Date
                            </p>
                            <p className="text-sm text-foreground">{formatDate(event.eventDate)}</p>
                        </div>

                        {event.description && (
                            <div>
                                <p className="text-sm text-foreground/60">Description</p>
                                <p className="text-sm text-foreground">{event.description}</p>
                            </div>
                        )}

                        {event.createdAt && (
                            <div>
                                <p className="text-sm text-foreground/60">Created</p>
                                <p className="text-sm text-foreground">{formatDate(event.createdAt)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics Card */}
                <div className="card-lift space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Images className="h-5 w-5 text-accent" />
                        Statistics
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted/50 p-4">
                            <p className="text-sm text-foreground/60">Total Photos</p>
                            <p className="mt-1 text-2xl font-bold text-primary">{event.photoCount}</p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <p className="text-sm text-foreground/60">Success Rate</p>
                            <p className="mt-1 text-2xl font-bold text-accent">{successRate}%</p>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
                            <div>
                                <p className="text-xs text-foreground/60">Successful</p>
                                <p className="text-lg font-bold text-foreground">{successfulMatches}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                            <AlertCircle className="h-5 w-5 shrink-0 text-orange-500" />
                            <div>
                                <p className="text-xs text-foreground/60">Attempted</p>
                                <p className="text-lg font-bold text-foreground">{attemptedMatches}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}