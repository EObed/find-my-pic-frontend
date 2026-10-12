'use client'

import { useState } from 'react'
import { ImageOff, Maximize2 } from 'lucide-react'
import { Lightbox } from '@/components/Lightbox'
import {Photo} from "@/interfaces/Photo";

interface MasonryGalleryProps {
    images: Photo[]
    eventName: string
}

export function MasonryGallery({ images, eventName }: MasonryGalleryProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">No photos yet</p>
                <p className="text-sm text-muted-foreground">Photos you upload to this event will appear here.</p>
            </div>
        )
    }

    const lightboxImages = images.map((image, index) => ({
        src: image.file,
        alt: image.title || `${eventName} - Photo ${index + 1}`,
    }))

    return (
        <>
            <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={image.id || index}
                        onClick={() => setOpenIndex(index)}
                        style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
                        className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-muted text-left outline-none animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both focus-visible:ring-2 focus-visible:ring-primary sm:mb-4"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element -- masonry needs natural image heights */}
                        <img
                            src={image.file}
                            alt={lightboxImages[index].alt}
                            loading="lazy"
                            className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-2 p-3 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <span className="truncate text-sm font-medium">{image.title || `Photo ${index + 1}`}</span>
                            <span className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                                <Maximize2 className="h-3.5 w-3.5" />
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <Lightbox images={lightboxImages} index={openIndex} onIndexChange={setOpenIndex} />
        </>
    )
}
