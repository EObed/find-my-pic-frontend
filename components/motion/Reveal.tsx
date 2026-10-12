'use client'

import { useEffect, useRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from 'react'

type RevealProps<T extends ElementType> = {
    as?: T
    /** Stagger delay in ms, applied once the element scrolls into view. */
    delay?: number
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/** Fades and lifts its content in the first time it enters the viewport (styles live in globals.css). */
export function Reveal<T extends ElementType = 'div'>({ as, delay = 0, style, ...props }: RevealProps<T>) {
    const Tag = (as ?? 'div') as ElementType
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.dataset.reveal = 'visible'
                    observer.disconnect()
                }
            },
            { rootMargin: '0px 0px -10% 0px' }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            data-reveal=""
            style={{ ...(style as CSSProperties), '--reveal-delay': `${delay}ms` } as CSSProperties}
            {...props}
        />
    )
}
