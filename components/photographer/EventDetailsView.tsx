import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { CalendarDays, ChevronRight, Clock, Images, Pencil, ScanFace, Target, UserCheck } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/CopyButton'
import { CountUp } from '@/components/motion/CountUp'
import { StatusPill } from '@/components/photographer/EventsTable'
import IEvent from '@/interfaces/Event'

// Server component: the static parts ship no JavaScript; CopyButton and CountUp are small client islands.
export function EventDetailsView({ event, guestLink }: { event: IEvent; guestLink: string }) {
    // Mock statistics - in production these would come from the backend.
    // Derived deterministically from the event id so renders stay stable.
    const seed = event.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const attemptedMatches = (seed * 37) % 500 + 100
    const successfulMatches = Math.floor(attemptedMatches * 0.65)
    const successRate = Math.round((successfulMatches / attemptedMatches) * 100)

    const stats = [
        { label: 'Photos', value: event.photoCount, icon: Images },
        { label: 'Guest searches', value: attemptedMatches, icon: ScanFace },
        { label: 'Guests matched', value: successfulMatches, icon: UserCheck },
        { label: 'Success rate', value: successRate, suffix: '%', icon: Target },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Link href="/p/my-events" className="transition-colors hover:text-foreground">
                        My Events
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="truncate text-foreground">{event.name}</span>
                </nav>

                <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-semibold text-balance sm:text-4xl">{event.name}</h1>
                            <StatusPill status={event.status} />
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="h-4 w-4" />
                                {format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                Created {format(parseISO(event.createdAt), 'MMM d, yyyy')}
                            </span>
                        </div>
                        {event.description && <p className="max-w-2xl text-muted-foreground">{event.description}</p>}
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                        <CopyButton
                            value={guestLink}
                            label="Copy guest link"
                            message="Guest link copied — share it with your guests"
                            className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 flex-row-reverse text-foreground sm:flex-none')}
                        >
                            Copy guest link
                        </CopyButton>
                        <Button className="flex-1 sm:flex-none" render={<Link href={`/p/my-events/${event.id}/edit`} />} nativeButton={false}>
                            <Pencil className="h-4 w-4" />
                            Edit event
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
                {/* Event code */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_45%)] p-6 text-primary-foreground animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 fill-mode-both">
                    <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
                    <p className="relative text-sm opacity-80">Event code</p>
                    <div className="relative mt-2 flex items-center justify-between gap-3">
                        <p className="font-mono text-3xl font-semibold tracking-wider">{event.code}</p>
                        <CopyButton
                            value={event.code}
                            label="Copy event code"
                            message={`Copied ${event.code}`}
                            className="rounded-lg bg-white/15 p-2.5 text-primary-foreground hover:bg-white/25 hover:text-primary-foreground [&_svg]:h-4 [&_svg]:w-4"
                        />
                    </div>
                    <p className="relative mt-4 text-sm opacity-80">Guests enter this code with a selfie to find their photos.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            style={{ animationDelay: `${100 + i * 60}ms` }}
                            className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card/80 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
                        >
                            <stat.icon className="h-5 w-5 text-primary" />
                            <div>
                                <CountUp value={stat.value} suffix={stat.suffix} className="block font-mono text-2xl font-semibold tabular-nums" />
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
