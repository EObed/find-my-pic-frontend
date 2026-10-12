import { Skeleton } from '@/components/ui/skeleton'

export default function MyEventsLoading() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-background" aria-label="Loading events" role="status">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                    <Skeleton className="h-9 w-full sm:w-36" />
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-[86px] rounded-2xl" />
                    ))}
                </div>

                <div className="mb-4 flex flex-col gap-3 md:flex-row md:justify-between">
                    <Skeleton className="h-10 w-full rounded-lg md:w-80" />
                    <Skeleton className="h-10 w-64 rounded-lg" />
                </div>

                <div className="overflow-hidden rounded-2xl border border-border">
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
