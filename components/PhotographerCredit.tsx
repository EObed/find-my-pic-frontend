'use client'

import Link from 'next/link'
import { ArrowUpRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/photographer/Avatar'
import type { PhotographerSummary } from '@/interfaces/Photographer'

interface PhotographerCreditProps {
    photographer: PhotographerSummary
}

export function PhotographerCredit({ photographer }: PhotographerCreditProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <Avatar name={photographer.name} src={photographer.avatarUrl} size="lg" />
                <div>
                    <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        <Camera className="h-3.5 w-3.5" />
                        Shot by
                    </p>
                    <p className="text-lg font-semibold text-foreground">{photographer.name}</p>
                </div>
            </div>

            {/* Opens in a new tab so the guest's matched results aren't lost */}
            <Button
                variant="outline"
                className="w-full sm:w-auto"
                render={<Link href={`/photographers/${photographer.id}`} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
            >
                View Profile
                <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
