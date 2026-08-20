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
import { Skeleton } from '@/components/ui/skeleton'
import { Eye, Trash2, CalendarX2 } from 'lucide-react'
import IEvent from "@/interfaces/Event";

interface EventsTableProps {
    events: IEvent[]
    onView: (event: IEvent) => void
    onDelete: (event: IEvent) => void
    isLoading?: boolean
}

export function EventsTable({
                                events,
                                onView,
                                onDelete,
                                isLoading = false,
                            }: EventsTableProps) {
    if (isLoading) {
        return (
            <div className="overflow-hidden rounded-xl border border-border">
                <div className="divide-y divide-border">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="ml-auto h-8 w-16" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

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
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
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
                                            onClick={() => onView(event)}
                                            className="h-8 w-8"
                                            title="View event"
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