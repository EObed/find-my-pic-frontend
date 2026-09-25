'use client'

import { useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AlertTriangle } from 'lucide-react'
import {toast} from "sonner";
import { deleteEventAction } from '@/actions/events'

interface DeleteEventDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    event: {
        id: string
        name: string
    } | null
}

export function DeleteEventDialog({
                                      open,
                                      onOpenChange,
                                      event,
                                  }: DeleteEventDialogProps) {
    const [isLoading, startTransition] = useTransition()

    if (!event) return null

    const handleDelete = () => {
        startTransition(async () => {
            // The action revalidates /p/my-events, so the list re-renders without the event.
            const result = await deleteEventAction(event.id)
            if (result.ok === false) {
                toast.error(result.message ?? 'Failed to delete event. Please try again.')
                return
            }
            toast.success('Event deleted successfully')
            onOpenChange(false)
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                            <AlertDialogTitle>Delete Event</AlertDialogTitle>
                            <AlertDialogDescription className="mt-2">
                                Are you sure you want to delete{' '}
                                <span className="font-semibold text-foreground">
                  {event.name}
                </span>
                                ? This action cannot be undone.
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>

                <div className="flex justify-end gap-3 pt-4">
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}