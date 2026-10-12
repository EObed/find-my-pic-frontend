'use client'

import type { ComponentProps, PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/** A card whose background glows under the cursor. */
export function SpotlightCard({ className, onPointerMove, ...props }: ComponentProps<'div'>) {
    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
        onPointerMove?.(event)
    }

    return (
        <div
            onPointerMove={handlePointerMove}
            className={cn(
                'spotlight rounded-2xl border border-border bg-card/80 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-20px_color-mix(in_oklch,var(--primary),transparent_55%)]',
                className
            )}
            {...props}
        />
    )
}
