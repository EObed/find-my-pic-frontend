'use client'

import { Camera } from 'lucide-react'

interface Props {
    title?: string
    description?: string
}

export function Loader({ title, description }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glow-ring mx-4 flex max-w-sm flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-xl animate-in zoom-in-95 fade-in duration-300">
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-muted" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-3 rounded-full bg-primary/10 animate-pulse" />
                    <Camera className="relative h-7 w-7 text-primary" />
                </div>

                <div className="space-y-1.5 text-center">
                    <h3 className="text-base font-semibold text-foreground">
                        {title ?? 'Processing Your Image'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {description ?? 'Our AI is analyzing your photo and searching for matches...'}
                    </p>
                </div>

                <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                </div>
            </div>
        </div>
    )
}