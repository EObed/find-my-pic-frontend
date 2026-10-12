'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CircleCheck, ScanFace } from 'lucide-react'
import { cn } from '@/lib/utils'

// Pravatar ids: 68 is "you"; tiles with the same id are the matches.
const SELFIE_ID = 68
const TILES = [
    { id: 12 },
    { id: SELFIE_ID, score: 98 },
    { id: 33 },
    { id: 47 },
    { id: SELFIE_ID, score: 94 },
    { id: 59 },
    { id: 5 },
    { id: SELFIE_ID, score: 89 },
    { id: 25 },
]

const STEP_MS = 520
const PAUSE_STEPS = 6 // hold the finished result for a few ticks before looping

/** Animated hero visual: scans an event gallery tile by tile and highlights the guest's matches. */
export function MatchDemo() {
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const timer = setInterval(() => setStep((s) => (s + 1) % (TILES.length + PAUSE_STEPS)), STEP_MS)
        return () => clearInterval(timer)
    }, [])

    // Before hydration (and with reduced motion) show the finished state.
    const scanned = step === 0 ? TILES.length : Math.min(step, TILES.length)
    const scanning = step > 0 && step <= TILES.length ? step - 1 : -1
    const matches = TILES.slice(0, scanned).filter((tile) => tile.score).length

    return (
        <div className="relative rounded-3xl border border-border bg-card/80 p-5 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--primary),transparent_40%)] backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between gap-4 pb-5">
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl ring-2 ring-primary/60 ring-offset-2 ring-offset-card">
                        <Image src={`https://i.pravatar.cc/160?img=${SELFIE_ID}`} alt="Your selfie" fill sizes="48px" className="object-cover" priority />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Your selfie</p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ScanFace className="h-3.5 w-3.5 text-primary" />
                            {scanning >= 0 ? 'Scanning gallery…' : 'Scan complete'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{matches}</p>
                    <p className="text-xs text-muted-foreground">matches</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {TILES.map((tile, i) => {
                    const isScanned = i < scanned
                    const isMatch = isScanned && tile.score
                    return (
                        <div
                            key={i}
                            className={cn(
                                'relative aspect-square overflow-hidden rounded-xl transition-all duration-500',
                                isMatch && 'ring-2 ring-primary ring-offset-2 ring-offset-card',
                                isScanned && !isMatch && 'opacity-40 grayscale',
                                i === scanning && 'scale-[1.04]'
                            )}
                        >
                            <Image
                                src={`https://i.pravatar.cc/240?img=${tile.id}`}
                                alt={isMatch ? 'Matched event photo' : 'Event photo'}
                                fill
                                sizes="(min-width: 1024px) 160px, 30vw"
                                className="object-cover"
                            />
                            {i === scanning && (
                                <div className="absolute inset-0 bg-primary/15">
                                    <div className="scan-line absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                                </div>
                            )}
                            {isMatch && (
                                <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm animate-in fade-in zoom-in-75 duration-300">
                                    <CircleCheck className="h-3 w-3 text-emerald-400" />
                                    {tile.score}%
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-out"
                    style={{ width: `${(scanned / TILES.length) * 100}%` }}
                />
            </div>
        </div>
    )
}
