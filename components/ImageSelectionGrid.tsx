'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ImageOff, Maximize2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Lightbox } from '@/components/Lightbox'
import { cn } from '@/lib/utils'

export interface MatchedImage {
    id: string
    preview: string
    matchScore: number
}

interface ImageSelectionGridProps {
    images: MatchedImage[]
    selectedImageIds: string[]
    onImageSelect: (imageId: string) => void
    isLoading: boolean
}

export function ImageSelectionGrid({
    images,
    selectedImageIds,
    onImageSelect,
    isLoading,
}: ImageSelectionGridProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-2xl" />
                ))}
            </div>
        )
    }

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center animate-in fade-in duration-500">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground">No matching photos found</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                    Try uploading a different photo or double-check the event code
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {images.map((image, index) => {
                    const isSelected = selectedImageIds.includes(image.id)
                    return (
                        <div
                            key={image.id}
                            style={{ animationDelay: `${Math.min(index * 50, 450)}ms` }}
                            className={cn(
                                'group relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both',
                                isSelected ? 'ring-3 ring-primary ring-offset-2 ring-offset-background' : 'ring-0'
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => onImageSelect(image.id)}
                                aria-pressed={isSelected}
                                aria-label={`${isSelected ? 'Deselect' : 'Select'} photo ${index + 1}`}
                                className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <Image
                                    src={image.preview}
                                    alt={`Matched photo ${index + 1}`}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                    className={cn(
                                        'object-cover transition-transform duration-500 ease-out',
                                        isSelected ? 'scale-95' : 'group-hover:scale-105'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'absolute inset-0 transition-colors duration-200',
                                        isSelected ? 'bg-primary/15' : 'bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100'
                                    )}
                                />
                            </button>

                            <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                                {image.matchScore}% match
                            </span>

                            <span
                                className={cn(
                                    'pointer-events-none absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200',
                                    isSelected
                                        ? 'scale-100 border-primary bg-primary text-primary-foreground'
                                        : 'scale-90 border-white/80 bg-black/20 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                                )}
                            >
                                {isSelected && <Check className="h-3.5 w-3.5 animate-in zoom-in duration-200" />}
                            </span>

                            <button
                                type="button"
                                onClick={() => setOpenIndex(index)}
                                className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/70 focus-visible:opacity-100"
                                aria-label={`Open photo ${index + 1}`}
                            >
                                <Maximize2 className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )
                })}
            </div>

            <Lightbox
                images={images.map((image, index) => ({ src: image.preview, alt: `Matched photo ${index + 1}` }))}
                index={openIndex}
                onIndexChange={setOpenIndex}
            />
        </>
    )
}
