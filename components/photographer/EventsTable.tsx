'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { ArrowUpRight, CalendarX2, ImageOff, Plus, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import IEvent from "@/interfaces/Event";
import { cn } from '@/lib/utils'

interface EventsTableProps {
    events: IEvent[]
    onDelete: (event: IEvent) => void
}

// date-fns keeps server and client output identical, avoiding hydration mismatches
export const formatEventDate = (date: string) => format(parseISO(date), 'MMM d, yyyy')

export function StatusPill({ status }: { status: IEvent['status'] }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-muted text-muted-foreground'
            )}
        >
            <span className={cn('h-1.5 w-1.5 rounded-full', status === 'active' ? 'animate-pulse bg-emerald-500' : 'bg-muted-foreground/60')} />
            {status}
        </span>
    )
}

export function EventsEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 py-20 text-center animate-in fade-in duration-500">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15">
                <CalendarX2 className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground">No events yet</p>
            <p className="max-w-xs text-muted-foreground">Create your first event to get a code you can share with guests.</p>
            <Button className="mt-2" render={<Link href="/p/my-events/new" />} nativeButton={false}>
                <Plus className="h-4 w-4" />
                Create event
            </Button>
        </div>
    )
}

export function EventsTable({
                                events,
                                onDelete,
                            }: EventsTableProps) {
    const router = useRouter()

    if (events.length === 0) return <EventsEmptyState />

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-xs animate-in fade-in duration-500">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="pl-5">Event</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden text-right sm:table-cell">Photos</TableHead>
                            <TableHead className="pr-5 text-right">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event, i) => (
                            <TableRow
                                key={event.id}
                                onClick={() => router.push(`/p/my-events/${event.id}`)}
                                style={{ animationDelay: `${Math.min(i * 40, 240)}ms` }}
                                className="group cursor-pointer animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both hover:bg-muted/50"
                            >
                                <TableCell className="py-3 pl-5">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                                            {event.photos[0] ? (
                                                // eslint-disable-next-line @next/next/no-img-element -- small remote cover thumbnail
                                                <img src={event.photos[0].file} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                            ) : (
                                                <ImageOff className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <Link
                                                href={`/p/my-events/${event.id}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="block max-w-[16rem] truncate font-medium text-foreground transition-colors group-hover:text-primary"
                                            >
                                                {event.name}
                                            </Link>
                                            {event.description && (
                                                <p className="max-w-[16rem] truncate text-xs text-muted-foreground">{event.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <CopyButton value={event.code} label={`Copy code ${event.code}`} message={`Copied ${event.code}`} className="font-mono text-sm">
                                        {event.code}
                                    </CopyButton>
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground md:table-cell">{formatEventDate(event.date)}</TableCell>
                                <TableCell>
                                    <StatusPill status={event.status} />
                                </TableCell>
                                <TableCell className="hidden text-right font-mono tabular-nums sm:table-cell">{event.photoCount}</TableCell>
                                <TableCell className="pr-5 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onDelete(event)
                                            }}
                                            className="text-muted-foreground opacity-100 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                                            aria-label={`Delete ${event.name}`}
                                            title="Delete event"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
