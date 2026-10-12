'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, Rows3, Search, X } from 'lucide-react'
import { EventsTable } from '@/components/photographer/EventsTable'
import { EventsGrid } from '@/components/photographer/EventsGrid'
import { DeleteEventDialog } from '@/components/photographer/DeleteEventDialog'
import IEvent from '@/interfaces/Event'
import { cn } from '@/lib/utils'

type StatusFilter = 'all' | IEvent['status']
type View = 'table' | 'grid'

const FILTERS: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

/** Client island for the server-rendered My Events page: search, filters, view toggle, and delete dialog. */
export function MyEventsContent({ events }: { events: IEvent[] }) {
    const [eventToDelete, setEventToDelete] = useState<IEvent | null>(null)
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<StatusFilter>('all')
    const [view, setView] = useState<View>('table')

    const counts = useMemo(
        () => ({
            all: events.length,
            active: events.filter((event) => event.status === 'active').length,
            inactive: events.filter((event) => event.status === 'inactive').length,
        }),
        [events]
    )

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase()
        return events.filter(
            (event) =>
                (status === 'all' || event.status === status) &&
                (!needle || event.name.toLowerCase().includes(needle) || event.code.toLowerCase().includes(needle))
        )
    }, [events, query, status])

    const isFiltering = query.trim() !== '' || status !== 'all'

    return (
        <>
            {events.length > 0 && (
                <div className="mb-4 flex flex-col gap-3 animate-in fade-in duration-500 md:flex-row md:items-center md:justify-between">
                    <div className="relative md:w-80">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by name or code"
                            aria-label="Search events"
                            className="h-10 w-full rounded-lg border border-input bg-card/60 pr-9 pl-9 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground hover:border-primary/30 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 [&::-webkit-search-cancel-button]:hidden"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                aria-label="Clear search"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Status filter */}
                        <div role="tablist" aria-label="Filter by status" className="flex rounded-lg border border-border bg-card/60 p-1">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter.value}
                                    type="button"
                                    role="tab"
                                    aria-selected={status === filter.value}
                                    onClick={() => setStatus(filter.value)}
                                    className={cn(
                                        'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                                        status === filter.value
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {filter.label}
                                    <span
                                        className={cn(
                                            'rounded-full px-1.5 font-mono text-[11px] tabular-nums',
                                            status === filter.value ? 'bg-primary-foreground/20' : 'bg-muted'
                                        )}
                                    >
                                        {counts[filter.value]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* View toggle */}
                        <div className="flex rounded-lg border border-border bg-card/60 p-1">
                            {([
                                { value: 'table', icon: Rows3, label: 'Table view' },
                                { value: 'grid', icon: LayoutGrid, label: 'Grid view' },
                            ] as const).map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setView(option.value)}
                                    aria-label={option.label}
                                    aria-pressed={view === option.value}
                                    title={option.label}
                                    className={cn(
                                        'rounded-md p-1.5 transition-colors',
                                        view === option.value ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    <option.icon className="h-4 w-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isFiltering && filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center animate-in fade-in duration-300">
                    <Search className="h-6 w-6 text-muted-foreground" />
                    <p className="font-medium">No events match your filters</p>
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('')
                            setStatus('all')
                        }}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            ) : view === 'grid' ? (
                <EventsGrid events={filtered} onDelete={setEventToDelete} />
            ) : (
                <EventsTable events={filtered} onDelete={setEventToDelete} />
            )}

            <DeleteEventDialog
                open={eventToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setEventToDelete(null)
                }}
                event={eventToDelete}
            />
        </>
    )
}
