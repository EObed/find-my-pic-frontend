'use client'

import Image from 'next/image'
import { Check, ImageOff } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                        <Skeleton className="h-full w-full" />
                    </div>
                ))}
            </div>
        )
    }

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center animate-in fade-in duration-500">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {images.map((image, index) => {
                const isSelected = selectedImageIds.includes(image.id)
                return (
                    <button
                        type="button"
                        key={image.id}
                        onClick={() => onImageSelect(image.id)}
                        style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
                        className={`card-lift group relative aspect-square animate-in fade-in zoom-in-95 overflow-hidden rounded-xl border-2 fill-mode-both outline-none duration-500 ${
                            isSelected
                                ? 'border-primary shadow-lg'
                                : 'border-transparent hover:border-primary/40'
                        }`}
                    >
                        <Image
                            src={image.preview}
                            alt="Matched photo"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div
                            className={`absolute inset-0 transition-colors duration-200 ${
                                isSelected ? 'bg-primary/25' : 'bg-black/0 group-hover:bg-black/15'
                            }`}
                        />

                        <span className="absolute top-2 left-2 rounded-full border border-white/20 bg-black/55 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                            {image.matchScore}% match
                        </span>

                        <span
                            className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
                                isSelected
                                    ? 'scale-100 border-primary bg-primary text-primary-foreground opacity-100'
                                    : 'scale-75 border-white/40 bg-black/40 text-white opacity-0 group-hover:scale-100 group-hover:opacity-100'
                            }`}
                        >
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}