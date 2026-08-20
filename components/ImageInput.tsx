'use client'

import { useState, useRef } from 'react'
import { Upload, Camera, X, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageInputProps {
    onImageSelected: (file: File) => void
    disabled?: boolean
}

export function ImageInput({ onImageSelected, disabled = false }: ImageInputProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [cameraError, setCameraError] = useState<string | null>(null)

    // Track whether we are using the 'user' (front) or 'environment' (back) camera
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

    const fileInputRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    // --- File System Handlers ---
    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        setFileName(file.name)
        onImageSelected(file)

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileSelect(file)
    }

    // --- Live Camera Stream Handlers ---
    const startCamera = async (currentFacingMode = facingMode) => {
        setCameraError(null)
        setIsCameraActive(true)

        // If there's an existing stream running, shut it down before requesting a new one
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
        }

        try {
            // Requests the specified camera ('user' = front/selfie camera)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: currentFacingMode },
                audio: false
            })

            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error("Error accessing camera: ", err)
            setCameraError("Could not access your camera. Please check permissions.")
            setIsCameraActive(false)
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
        setIsCameraActive(false)
    }

    // Flips between 'user' (front) and 'environment' (back) cameras
    const toggleCamera = () => {
        const nextMode = facingMode === 'user' ? 'environment' : 'user'
        setFacingMode(nextMode)
        startCamera(nextMode) // Re-initialize stream with the new lens constraint
    }

    const capturePhoto = () => {
        if (!videoRef.current) return

        const video = videoRef.current
        const canvas = document.createElement('canvas')

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const ctx = canvas.getContext('2d')
        if (ctx) {
            // Mirror the final photo if capturing using the front camera so it looks natural
            if (facingMode === 'user') {
                ctx.translate(canvas.width, 0)
                ctx.scale(-1, 1)
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            canvas.toBlob((blob) => {
                if (blob) {
                    const generatedName = `camera_capture_${Date.now()}.jpg`
                    const file = new File([blob], generatedName, { type: 'image/jpeg' })

                    setFileName(generatedName)
                    onImageSelected(file)
                    setPreview(canvas.toDataURL('image/jpeg'))
                    stopCamera()
                }
            }, 'image/jpeg', 0.95)
        }
    }

    const handleClear = () => {
        setPreview(null)
        setFileName(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    // --- VIEW 1: Image Captured Preview Mode ---
    if (preview) {
        return (
<div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <div className="glow-ring relative overflow-hidden rounded-2xl border border-border bg-muted">
                    <img
                        src={preview}
                        alt="Selected"
                        className="mx-auto h-auto max-h-96 w-full object-cover"
                    />
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Photo ready
                    </span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
                    <p className="truncate text-sm text-muted-foreground">{fileName}</p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        disabled={disabled}
                        className="shrink-0"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Change
                    </Button>
                </div>
            </div>
        )
    }

    // --- VIEW 2: Active Live Camera Interface ---
    if (isCameraActive) {
        return (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-accent/40 bg-black md:max-h-[500px]">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        // We visually mirror the video stream element if using the front camera so it acts like a real mirror
                        className={`h-full w-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                    />

                    {/* Top overlay action to flip camera lens */}
                    <button
                        type="button"
                        onClick={toggleCamera}
                        className="absolute top-3 left-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        title="Switch Camera"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </button>

                    {/* Top overlay action to cancel out */}
                    <button
                        type="button"
                        onClick={stopCamera}
                        className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Framing guide */}
                    <div className="pointer-events-none absolute inset-8 rounded-2xl border-2 border-dashed border-white/30" />
                </div>

                <div className="flex justify-center">
                    <Button
                        type="button"
                        size="lg"
                        onClick={capturePhoto}
                        disabled={disabled}
                        className="rounded-full bg-accent px-8 font-medium text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 active:scale-95"
                    >
                        <Camera className="mr-2 h-5 w-5" />
                        Snap Photo
                    </Button>
                </div>
            </div>
        )
    }

    // --- VIEW 3: Initial Selection Tiles ---
    return (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                disabled={disabled}
                className="hidden"
            />

            {cameraError && (
                <p className="text-center text-sm font-medium text-destructive">{cameraError}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                    className="card-lift group relative rounded-2xl border-2 border-dashed border-primary/30 bg-card p-6 transition-colors hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                            <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Upload Photo</p>
                            <p className="text-xs text-muted-foreground">Browse your files</p>
                        </div>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => startCamera()}
                    disabled={disabled}
                    className="card-lift group relative rounded-2xl border-2 border-dashed border-accent/30 bg-card p-6 transition-colors hover:border-accent/60 hover:bg-accent/5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="rounded-xl bg-accent/10 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                            <Camera className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Take Photo</p>
                            <p className="text-xs text-muted-foreground">Use your camera</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}