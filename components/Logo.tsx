import Link from 'next/link'
import { Aperture } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Brand mark + wordmark. Change the name here once the brand is final (checklist section 6). */
export function Logo({ href = '/', className }: { href?: string; className?: string }) {
    return (
        <Link href={href} className={cn('group flex items-center gap-2.5', className)}>
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_6px_16px_-6px_color-mix(in_oklch,var(--primary),transparent_30%)]">
                <Aperture className="h-5 w-5 text-white transition-transform duration-700 group-hover:rotate-180" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">ImageFinder</span>
        </Link>
    )
}
