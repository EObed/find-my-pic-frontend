import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { CalendarDays, CircleCheck, Images, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CountUp } from '@/components/motion/CountUp'
import { MyEventsContent } from '@/components/photographer/MyEventsContent'
import { getEvents } from '@/lib/api/events'

export const metadata: Metadata = { title: 'My Events' }

export default async function MyEventsPage() {
    await connection()
    const events = await getEvents()

    const stats = [
        { label: 'Total events', value: events.length, icon: CalendarDays },
        { label: 'Active events', value: events.filter((event) => event.status === 'active').length, icon: CircleCheck },
        { label: 'Photos uploaded', value: events.reduce((sum, event) => sum + event.photoCount, 0), icon: Images },
    ]

    return (
        <main className="relative min-h-[calc(100vh-4rem)] bg-background">
            <div className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60" />

            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-end">
                    <div>
                        <h1 className="text-3xl font-semibold sm:text-4xl">My Events</h1>
                        <p className="mt-2 text-muted-foreground">Manage your event galleries and share codes with guests.</p>
                    </div>

                    <Button className="w-full sm:w-auto" render={<Link href="/p/my-events/new" />} nativeButton={false}>
                        <Plus className="h-4 w-4" />
                        Create event
                    </Button>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            style={{ animationDelay: `${i * 80}ms` }}
                            className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-primary/15">
                                <stat.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CountUp value={stat.value} className="block font-mono text-2xl font-semibold tabular-nums" />
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <MyEventsContent events={events} />
            </div>
        </main>
    )
}
