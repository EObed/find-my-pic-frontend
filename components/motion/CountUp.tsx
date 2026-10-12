'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
    value: number
    /** Animation length in ms. */
    duration?: number
    suffix?: string
    className?: string
}

/** Counts from 0 to `value` once visible. Renders the final value on the server so it is never blank. */
export function CountUp({ value, duration = 1200, suffix = '', className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [display, setDisplay] = useState(value)

    useEffect(() => {
        const node = ref.current
        if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let frame = 0
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()

            const start = performance.now()
            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplay(Math.round(value * eased))
                if (progress < 1) frame = requestAnimationFrame(tick)
            }
            frame = requestAnimationFrame(tick)
        })
        observer.observe(node)

        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [value, duration])

    return (
        <span ref={ref} className={className}>
            {display.toLocaleString('en-US')}
            {suffix}
        </span>
    )
}
