'use client'

import { Button } from '@/components/ui/button'
import { Calendar, FileText, Images, CheckCircle, AlertCircle } from 'lucide-react'

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
    // Mock statistics - in production these would come from the backend
    const attemptedMatches = Math.floor(Math.random() * 500) + 100
    const successfulMatches = Math.floor(attemptedMatches * 0.65)
    const successRate = Math.round((successfulMatches / attemptedMatches) * 100)

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-balance">{event.name}</h1>
                    <p className="text-foreground/60 mt-1">Event Gallery</p>
                </div>
                <Button
                    onClick={onEdit}
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-shadow w-full sm:w-auto"
                >
                    Edit Event
                </Button>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Information Card */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Event Information
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-foreground/60">Event Code</p>
                            <p className="text-lg font-mono font-semibold text-primary">{event.code}</p>
                        </div>

                        <div>
                            <p className="text-sm text-foreground/60 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
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
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Images className="w-5 h-5 text-accent" />
                        Statistics
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                            <p className="text-sm text-foreground/60">Total Photos</p>
                            <p className="text-2xl font-bold text-primary mt-1">{event.photoCount}</p>
                        </div>

                        <div className="bg-background/50 rounded-lg p-4">
                            <p className="text-sm text-foreground/60">Success Rate</p>
                            <p className="text-2xl font-bold text-accent mt-1">{successRate}%</p>
                        </div>

                        <div className="bg-background/50 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-foreground/60">Successful</p>
                                <p className="text-lg font-bold text-foreground">{successfulMatches}</p>
                            </div>
                        </div>

                        <div className="bg-background/50 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
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
