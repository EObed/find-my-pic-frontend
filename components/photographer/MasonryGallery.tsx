'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ImageOff, X } from 'lucide-react'
import {Photo} from "@/interfaces/Photo";

interface MasonryGalleryProps {
    images: Photo[]
    eventName: string
}

export function MasonryGallery({ images, eventName }: MasonryGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-foreground/60">No images uploaded yet for this event.</p>
            </div>
        )
    }

    return (
        <div>
            {/* Masonry Grid */}
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {images.map((image, index) => (
                    <div
                        key={image.id || index}
                        style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
                        className="card-lift group relative mb-4 block break-inside-avoid cursor-pointer overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both hover:border-primary/50 hover:shadow-lg"
                        onClick={() => setSelectedImage(image.file)}
                    >
                        <img
                            src={image.file}
                            alt={`${eventName} - Photo ${index + 1}`}
                            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative h-full max-h-[90vh] w-full max-w-4xl animate-in zoom-in-95 duration-200">
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="h-full w-full object-contain"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 rounded-full p-1 text-white transition-colors hover:text-primary"
                            aria-label="Close"
                        >
                            <X className="h-8 w-8" />
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
