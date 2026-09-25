'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Covers every dashboard page; the navbar in the (dashboard) layout stays visible above it.
export default function DashboardError({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="space-y-4 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                <p className="text-foreground/60">We couldn&apos;t load this page. Please try again.</p>
                <Button onClick={() => unstable_retry()}>Try again</Button>
            </div>
        </div>
    )
}
