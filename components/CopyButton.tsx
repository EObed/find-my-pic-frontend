'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
    value: string
    label?: string
    /** Toast shown after copying; defaults to "Copied". */
    message?: string
    className?: string
    children?: React.ReactNode
}

export function CopyButton({ value, label = 'Copy', message = 'Copied to clipboard', className, children }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async (event: React.MouseEvent) => {
        event.stopPropagation()
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            toast.success(message)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            toast.error('Could not copy — please copy it manually')
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={label}
            title={label}
            className={cn(
                'inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring',
                className
            )}
        >
            {children}
            <span className="relative h-3.5 w-3.5">
                <Copy className={cn('absolute inset-0 h-3.5 w-3.5 transition-all', copied && 'scale-50 opacity-0')} />
                <Check className={cn('absolute inset-0 h-3.5 w-3.5 text-emerald-500 transition-all', !copied && 'scale-50 opacity-0')} />
            </span>
        </button>
    )
}
