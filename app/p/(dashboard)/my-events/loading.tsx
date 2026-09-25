import { Skeleton } from '@/components/ui/skeleton'

export default function MyEventsLoading() {
    return (
        <main className="min-h-screen bg-background" aria-label="Loading events" role="status">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <Skeleton className="h-9 w-full sm:w-36" />
                </div>

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
            </div>
        </main>
    )
}
