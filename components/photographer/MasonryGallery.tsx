'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MasonryGalleryProps {
    images: Array<{
        id: string
        preview: string
    }>
    eventName: string
}

export function MasonryGallery({ images, eventName }: MasonryGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    if (images.length === 0) {
        return (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
                <p className="text-foreground/60">No images uploaded yet for this event.</p>
            </div>
        )
    }

    return (
        <div>
            {/* Masonry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {images.map((image, index) => (
                    <div
                        key={image.id || index}
                        className="relative bg-background rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                        onClick={() => setSelectedImage(image.preview)}
                    >
                        <img
                            src={image.preview}
                            alt={`${eventName} - Photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="w-full h-full object-contain"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 text-white hover:text-foreground transition-colors"
                            aria-label="Close"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
