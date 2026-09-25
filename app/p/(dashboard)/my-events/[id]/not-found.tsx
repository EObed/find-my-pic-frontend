import Link from 'next/link'
import { ArrowLeft, CalendarX2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EventNotFound() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="space-y-4 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <CalendarX2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
                <p className="text-foreground/60">This event may have been deleted or never existed.</p>
                <Button variant="outline" render={<Link href="/p/my-events" />} nativeButton={false}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to My Events
                </Button>
            </div>
        </div>
    )
}
