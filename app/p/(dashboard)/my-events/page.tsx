'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {EventsTable} from "@/components/photographer/EventsTable";
import {toast} from "sonner";
import {DeleteEventDialog} from "@/components/photographer/DeleteEventDialog";
import IEvent from "@/interfaces/Event";

const generateMockEvents = (): IEvent[] => {
    return [
        {
            id: "1",
            name: "Wedding - Johnson & Smith",
            date: "2024-06-15",
            code: "WED2024001",
            description: "Outdoor wedding ceremony and reception at the Grand Garden",
            status: "active",
            photoCount: 245,
            createdAt: new Date("2024-05-01"),
            photos: [
                { id: "p1", title: "Ceremony", file: "/photos/wedding1.jpg" },
                { id: "p2", title: "Reception", file: "/photos/wedding2.jpg" }
            ]
        },
        {
            id: "2",
            name: "Birthday - Sarah's 30th",
            date: "2024-07-20",
            code: "BDAY2024002",
            description: "Surprise birthday party with friends and family",
            status: "active",
            photoCount: 89,
            createdAt: new Date("2024-06-10"),
            photos: [
                { id: "p3", title: "Cake cutting", file: "/photos/birthday1.jpg" }
            ]
        },
        {
            id: "3",
            name: "Corporate Event - Tech Conference 2024",
            date: "2024-08-05",
            code: "CORP2024003",
            description: "Annual technology conference with keynote speakers",
            status: "inactive",
            photoCount: 512,
            createdAt: new Date("2024-07-01"),
            photos: [
                { id: "p4", title: "Keynote", file: "/photos/corp1.jpg" },
                { id: "p5", title: "Workshop", file: "/photos/corp2.jpg" },
                { id: "p6", title: "Networking", file: "/photos/corp3.jpg" }
            ]
        },
        {
            id: "4",
            name: "Graduation - Class of 2024",
            date: "2024-09-10",
            code: "GRAD2024004",
            description: "University graduation ceremony",
            status: "active",
            photoCount: 178,
            createdAt: new Date("2024-08-15"),
            photos: [
                { id: "p7", title: "Diploma ceremony", file: "/photos/grad1.jpg" }
            ]
        },
        {
            id: "5",
            name: "Family Reunion",
            date: "2024-10-12",
            code: "FAM2024005",
            description: "Annual family gathering at the lake house",
            status: "inactive",
            photoCount: 67,
            createdAt: new Date("2024-09-20"),
            photos: []
        }
    ]
}

export default function MyEventsPage() {
    const router = useRouter()

    const [events, setEvents] = useState<IEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // Selected event
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)

    const handleViewEvent = (event: IEvent) => {
        router.push(`/p/my-events/${event.id}`)
    }

    const handleDeleteEvent = (event: IEvent) => {
        setSelectedEvent(event)
        setIsDeleteDialogOpen(true)
    }

    const handleCreateNewEvent = () => {
        setSelectedEvent(null)
        //setIsCreateDialogOpen(true)
    }

    const handleDialogSuccess = () => {
        // Refetch events after successful delete/create
        setIsLoading(true)
        setTimeout(() => {
            try {
                const mockEvents = generateMockEvents()
                setEvents(mockEvents)
                toast.success('Events refreshed successfully!')
            } catch (error) {
                console.error('Error generating events:', error)
                toast.error('Failed to refresh events')
            } finally {
                setIsLoading(false)
            }
        }, 3000)
    }

    useEffect(() => {
        // Define the fetch function inside useEffect
        const fetchEvents = () => {
            setTimeout(() => {
                try {
                    const mockEvents = generateMockEvents()
                    setEvents(mockEvents)
                    toast.success('Events loaded successfully!')
                } catch (error) {
                    console.error('Error generating events:', error)
                    toast.error('Failed to load events')
                } finally {
                    setIsLoading(false)
                }
            }, 3000)
        }

        fetchEvents()
    }, [])

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold sm:text-4xl">My Events</h1>
                        <p className="mt-2 text-foreground/60">
                            Manage your event galleries and upload photos
                        </p>
                    </div>

                    <Button
                        onClick={handleCreateNewEvent}
                        className="w-full shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:w-auto"
                        render={<Link href="/p/my-events/new" />}
                        nativeButton={false}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </div>

                {/* Events Table */}
                <EventsTable
                    events={events}
                    onView={handleViewEvent}
                    onDelete={handleDeleteEvent}
                    isLoading={isLoading}
                />
            </div>

            <DeleteEventDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                event={selectedEvent}
                onSuccess={handleDialogSuccess}
            />
        </main>
    )
}