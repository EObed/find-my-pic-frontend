import { Skeleton } from '@/components/ui/skeleton'

export default function EditEventLoading() {
    return (
        <div className="min-h-screen bg-background" aria-label="Loading event" role="status">
            <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-72 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
            </div>
        </div>
    )
}
