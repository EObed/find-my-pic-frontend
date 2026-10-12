'use client'

import { Button } from '@/components/ui/button'
import { CheckCheck, Download, Sparkles } from 'lucide-react'

interface ResultsHeaderProps {
    totalCount: number
    selectedCount: number
    isLoadingResults: boolean
    onDownload: () => void
    onDownloadAll: () => void
    onToggleAll: () => void
}

export function ResultsHeader({
    totalCount,
    selectedCount,
    isLoadingResults,
    onDownload,
    onDownloadAll,
    onToggleAll,
}: ResultsHeaderProps) {
    const allSelected = totalCount > 0 && selectedCount === totalCount

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Scan complete
                </span>
                <h1 className="text-4xl font-semibold sm:text-5xl">
                    We found <span className="text-gradient">{totalCount} photo{totalCount === 1 ? '' : 's'}</span> of you
                </h1>
                <p className="text-muted-foreground">Tap photos to select them, or open one to take a closer look.</p>
            </div>

            {/* Sticky action bar */}
            <div className="glass sticky top-20 z-30 flex flex-col gap-3 rounded-2xl border border-border p-3 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 pl-1">
                    <button
                        type="button"
                        onClick={onToggleAll}
                        disabled={isLoadingResults || totalCount === 0}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
                    >
                        <CheckCheck className="h-4 w-4 text-primary" />
                        {allSelected ? 'Clear selection' : 'Select all'}
                    </button>
                    <span className="text-sm text-muted-foreground">
                        <span className="font-mono tabular-nums text-foreground">{selectedCount}</span> of {totalCount} selected
                    </span>
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                        onClick={onDownload}
                        disabled={isLoadingResults || selectedCount === 0}
                        variant="outline"
                        className="flex-1 sm:flex-none"
                    >
                        <Download className="h-4 w-4" />
                        Download selected
                    </Button>

                    <Button onClick={onDownloadAll} disabled={isLoadingResults || totalCount === 0} className="flex-1 sm:flex-none">
                        <Download className="h-4 w-4" />
                        Download all
                    </Button>
                </div>
            </div>
        </div>
    )
}
