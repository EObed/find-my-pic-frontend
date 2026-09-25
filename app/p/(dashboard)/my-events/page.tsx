import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MyEventsContent } from '@/components/photographer/MyEventsContent'
import { getEvents } from '@/lib/api/events'

export const metadata: Metadata = { title: 'My Events' }

export default async function MyEventsPage() {
    await connection()
    const events = await getEvents()

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
                        className="w-full shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:w-auto"
                        render={<Link href="/p/my-events/new" />}
                        nativeButton={false}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </div>

                <MyEventsContent events={events} />
            </div>
        </main>
    )
}
