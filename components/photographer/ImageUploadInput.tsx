'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import {FrontEndImage} from "@/interfaces/Photo";

interface ImageUploadInputProps {
    onImagesChange: (images: FrontEndImage[]) => void
    maxImages?: number
}

export function ImageUploadInput({
                                     onImagesChange,
                                     maxImages = 100,
                                 }: ImageUploadInputProps) {
    const [pendingPhotos, setPendingPhotos] = useState<FrontEndImage[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const updateImages = (updated: FrontEndImage[]) => {
        setPendingPhotos(updated)
        onImagesChange(updated)
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files
        if (!files) return

        const remainingSlots = maxImages - pendingPhotos.length
        const newPhotos: FrontEndImage[] = Array.from(files)
            .slice(0, remainingSlots)
            .filter((file) => file.type.startsWith('image/'))
            .map((file) => ({
                tempId: Math.random().toString(36).substr(2, 9),
                file,
                preview: URL.createObjectURL(file),
            }))

        updateImages([...pendingPhotos, ...newPhotos])

        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removeImage = (tempId: string) => {
        const photo = pendingPhotos.find((p) => p.tempId === tempId)
        if (photo) URL.revokeObjectURL(photo.preview) // clean up blob URL
        updateImages(pendingPhotos.filter((p) => p.tempId !== tempId))
    }

    const replaceImage = (tempId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0]
        if (!file || !file.type.startsWith('image/')) return

        const updatedPhotos = pendingPhotos.map((p) => {
            if (p.tempId !== tempId) return p
            URL.revokeObjectURL(p.preview) // clean up old blob URL
            return { ...p, file, preview: URL.createObjectURL(file) }
        })

        updateImages(updatedPhotos)
        if (event.currentTarget) event.currentTarget.value = ''
    }

    return (
        <div className="space-y-4">
            {/* Upload Button */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="card-lift group relative cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={pendingPhotos.length >= maxImages}
                    className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                        <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">Click to upload images</p>
                        <p className="text-sm text-muted-foreground">
                            {pendingPhotos.length}/{maxImages} images
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            {pendingPhotos.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Uploaded Images</p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {pendingPhotos.map((photo, index) => (
                            <div
                                key={photo.tempId}
                                style={{ animationDelay: `${Math.min(index * 30, 240)}ms` }}
                                className="group relative aspect-square overflow-hidden rounded-lg bg-muted animate-in fade-in zoom-in-95 fill-mode-both"
                            >
                                <img
                                    src={photo.preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                    <label
                                        className="cursor-pointer rounded-lg bg-primary p-2 transition-colors hover:bg-primary/90"
                                        title="Replace image"
                                    >
                                        <Upload className="h-4 w-4 text-primary-foreground" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => replaceImage(photo.tempId, e)}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // prevent triggering the upload div's onClick
                                            removeImage(photo.tempId)
                                        }}
                                        className="rounded-lg bg-destructive p-2 transition-colors hover:bg-destructive/90"
                                        title="Remove image"
                                    >
                                        <X className="h-4 w-4 text-destructive-foreground" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pendingPhotos.length >= maxImages && (
                <p className="text-sm font-medium text-destructive">
                    Maximum number of images reached ({maxImages})
                </p>
            )}
        </div>
    )
}