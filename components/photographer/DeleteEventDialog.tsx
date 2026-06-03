import { useState } from 'react'
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

interface DeleteEventDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    event: {
        id: string
        name: string
    } | null
    onSuccess: () => void
}

export function DeleteEventDialog({
                                      open,
                                      onOpenChange,
                                      event,
                                      onSuccess,
                                  }: DeleteEventDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!event) return null

    const handleDelete = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`/api/events/${event.id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete event')
            }

            toast.success('Event deleted successfully')
            onOpenChange(false)
            onSuccess()
        } catch (error) {
            console.error('Error deleting event:', error)
            toast.error('Failed to delete event. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
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