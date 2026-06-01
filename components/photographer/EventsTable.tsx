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
import { Eye, Trash2 } from 'lucide-react'
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
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-r-transparent rounded-full mx-auto mb-4" />
                    <p className="text-foreground/60">Loading events...</p>
                </div>
            </div>
        )
    }

    if (events.length === 0) {
        return (
            <div className="flex items-center justify-center py-12 border border-dashed border-border rounded-lg">
                <div className="text-center">
                    <p className="text-lg font-medium text-foreground mb-2">
                        No events yet
                    </p>
                    <p className="text-foreground/60">
                        Create your first event to get started
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden">
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
                                <TableCell className="font-mono text-sm text-foreground/70">
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
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onView(event)}
                                            className="h-8 w-8"
                                            title="View event"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(event)}
                                            className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            title="Delete event"
                                        >
                                            <Trash2 className="w-4 h-4" />
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
