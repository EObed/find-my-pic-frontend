import { Skeleton } from '@/components/ui/skeleton'

export default function PhotographerProfileLoading() {
    return (
        <main className="min-h-screen bg-background" aria-label="Loading photographer profile" role="status">
            <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-36 lg:pb-28">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-4/5" />
                        <Skeleton className="h-4 w-full max-w-xl" />
                        <Skeleton className="h-4 w-3/4 max-w-md" />
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-8 w-24 rounded-lg" />
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-11 w-40 rounded-lg" />
                        <Skeleton className="h-11 w-36 rounded-lg" />
                    </div>
                </div>

                <Skeleton className="aspect-[4/5] rounded-3xl lg:ml-10" />
            </div>
        </main>
    )
}
