'use client'

import { Button } from '@/components/ui/button'
import { Download, GalleryHorizontalEnd } from 'lucide-react'

interface ResultsHeaderProps {
    totalCount: number
    selectedCount: number
    isLoadingResults: boolean
    onDownload: () => void
    onDownloadAll: () => void
}

export function ResultsHeader({
    totalCount,
    selectedCount,
    isLoadingResults,
    onDownload,
    onDownloadAll,
}: ResultsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <GalleryHorizontalEnd className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Your Matched Photos</h2>
                    <p className="text-sm text-muted-foreground">
                        {isLoadingResults
                            ? 'Searching the event gallery...'
                            : `${totalCount} photo${totalCount === 1 ? '' : 's'} found · ${selectedCount} selected`}
                    </p>
                </div>
            </div>

            <div className="flex w-full gap-3 sm:w-auto">
                <Button
                    onClick={onDownload}
                    disabled={isLoadingResults || selectedCount === 0}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                    {selectedCount > 0 && (
                        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                            {selectedCount}
                        </span>
                    )}
                </Button>

                <Button
                    onClick={onDownloadAll}
                    disabled={isLoadingResults || totalCount === 0}
                    className="flex-1 shadow-sm transition-shadow hover:shadow-md sm:flex-none"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </div>
        </div>
    )
}