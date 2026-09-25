import { Skeleton } from '@/components/ui/skeleton'

export default function EventDetailsLoading() {
    return (
        <main className="min-h-screen bg-background" aria-label="Loading event" role="status">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-80 max-w-full" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                        <Skeleton className="h-9 w-full sm:w-32" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Skeleton className="h-64 rounded-xl" />
                        <Skeleton className="h-64 rounded-xl" />
                    </div>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                        {[260, 180, 220, 300, 200, 240, 170, 280].map((height, i) => (
                            <Skeleton key={i} className="mb-4 w-full rounded-lg" style={{ height }} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
