'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageFile {
    id: string
    file: File
    preview: string
}

interface ImageUploadInputProps {
    onImagesChange: (images: ImageFile[]) => void
    maxImages?: number
    initialImages?: ImageFile[]
}

export function ImageUploadInput({
                                     onImagesChange,
                                     maxImages = 50,
                                     initialImages = [],
                                 }: ImageUploadInputProps) {
    const [images, setImages] = useState<ImageFile[]>(initialImages)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files
        if (!files) return

        const newImages: ImageFile[] = []
        const remainingSlots = maxImages - images.length

        Array.from(files).slice(0, remainingSlots).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const preview = URL.createObjectURL(file)
                newImages.push({
                    id: Math.random().toString(36).substr(2, 9),
                    file,
                    preview,
                })
            }
        })

        const updatedImages = [...images, ...newImages]
        setImages(updatedImages)
        onImagesChange(updatedImages)

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const removeImage = (id: string) => {
        const updatedImages = images.filter((img) => img.id !== id)
        setImages(updatedImages)
        onImagesChange(updatedImages)
    }

    const replaceImage = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0]
        if (!file || !file.type.startsWith('image/')) return

        const preview = URL.createObjectURL(file)
        const updatedImages = images.map((img) =>
            img.id === id
                ? {
                    id,
                    file,
                    preview,
                }
                : img
        )
        setImages(updatedImages)
        onImagesChange(updatedImages)

        // Reset input
        if (event.currentTarget) {
            event.currentTarget.value = ''
        }
    }

    return (
        <div className="space-y-4">
            {/* Upload Button */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={images.length >= maxImages}
                    className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-primary/60" />
                    <div>
                        <p className="font-semibold text-foreground">Click to upload images</p>
                        <p className="text-sm text-foreground/60">
                            {images.length}/{maxImages} images
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Uploaded Images</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
                            >
                                <img
                                    src={img.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <label
                                        className="cursor-pointer p-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                                        title="Replace image"
                                    >
                                        <Upload className="w-4 h-4 text-primary-foreground" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => replaceImage(img.id, e)}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="p-2 rounded-lg bg-destructive hover:bg-destructive/90 transition-colors"
                                        title="Remove image"
                                    >
                                        <X className="w-4 h-4 text-destructive-foreground" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {images.length >= maxImages && (
                <p className="text-sm text-destructive font-medium">
                    Maximum number of images reached ({maxImages})
                </p>
            )}
        </div>
    )
}
