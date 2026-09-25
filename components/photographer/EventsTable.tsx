'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Trash2, CalendarX2 } from 'lucide-react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import IEvent from "@/interfaces/Event";

interface EventsTableProps {
    events: IEvent[]
    onDelete: (event: IEvent) => void
}

export function EventsTable({
                                events,
                                onDelete,
                            }: EventsTableProps) {
    if (events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center animate-in fade-in duration-500">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <CalendarX2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground">
                    No events yet
                </p>
                <p className="text-muted-foreground">
                    Create your first event to get started
                </p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs animate-in fade-in duration-500">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Event Code</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Photos</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id} className="hover:bg-muted/50">
                                <TableCell className="font-medium">{event.name}</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">
                                    {event.code}
                                </TableCell>
                                <TableCell>
                                    {/* date-fns keeps server and client output identical, avoiding hydration mismatches */}
                                    {format(parseISO(event.date), 'MMM d, yyyy')}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            event.status === 'active' ? 'default' : 'secondary'
                                        }
                                    >
                                        {event.status.charAt(0).toUpperCase() +
                                            event.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{event.photoCount}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            title="View event"
                                            render={<Link href={`/p/my-events/${event.id}`} />}
                                            nativeButton={false}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(event)}
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive/90"
                                            title="Delete event"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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