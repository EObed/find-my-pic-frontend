'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LightboxImage {
    src: string
    alt: string
}

interface LightboxProps {
    images: LightboxImage[]
    /** Index of the open image, or null when closed. */
    index: number | null
    onIndexChange: (index: number | null) => void
}

/** Full-screen viewer: arrow keys / buttons / swipe to navigate, Esc or backdrop click to close. */
export function Lightbox({ images, index, onIndexChange }: LightboxProps) {
    const touchStartX = useRef<number | null>(null)
    const open = index !== null && images.length > 0

    useEffect(() => {
        if (!open) return

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onIndexChange(null)
            if (event.key === 'ArrowRight') onIndexChange((index! + 1) % images.length)
            if (event.key === 'ArrowLeft') onIndexChange((index! - 1 + images.length) % images.length)
        }
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', onKey)
        }
    }, [open, index, images.length, onIndexChange])

    if (!open) return null

    const current = images[index]
    const go = (delta: number) => onIndexChange((index + delta + images.length) % images.length)

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => onIndexChange(null)}
            onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
            onTouchEnd={(event) => {
                if (touchStartX.current === null) return
                const delta = event.changedTouches[0].clientX - touchStartX.current
                if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
                touchStartX.current = null
            }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 p-4 text-white" onClick={(event) => event.stopPropagation()}>
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs tabular-nums">
                    {index + 1} / {images.length}
                </span>
                <div className="flex items-center gap-1">
                    <a
                        href={current.src}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2.5 transition-colors hover:bg-white/10"
                        aria-label="Download photo"
                        title="Download"
                    >
                        <Download className="h-5 w-5" />
                    </a>
                    <button
                        type="button"
                        onClick={() => onIndexChange(null)}
                        className="rounded-full p-2.5 transition-colors hover:bg-white/10"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary remote/blob sources at natural size */}
                <img
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    onClick={(event) => event.stopPropagation()}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                />

                {images.length > 1 && (
                    <>
                        <NavButton side="left" onClick={() => go(-1)} />
                        <NavButton side="right" onClick={() => go(1)} />
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 overflow-x-auto p-4" onClick={(event) => event.stopPropagation()}>
                    {images.map((image, i) => (
                        <button
                            key={image.src + i}
                            type="button"
                            onClick={() => onIndexChange(i)}
                            className={cn(
                                'h-12 w-12 shrink-0 overflow-hidden rounded-md ring-2 transition-all',
                                i === index ? 'opacity-100 ring-white' : 'opacity-50 ring-transparent hover:opacity-80'
                            )}
                            aria-label={`Show photo ${i + 1}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element -- thumbnails of the same sources */}
                            <img src={image.src} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>,
        document.body
    )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
    const Icon = side === 'left' ? ChevronLeft : ChevronRight
    return (
        <button
            type="button"
            onClick={(event) => {
                event.stopPropagation()
                onClick()
            }}
            className={cn(
                'absolute top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:block',
                side === 'left' ? 'left-4' : 'right-4'
            )}
            aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
        >
            <Icon className="h-6 w-6" />
        </button>
    )
}
