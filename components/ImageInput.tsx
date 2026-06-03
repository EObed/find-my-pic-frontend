'use client'

import { useState, useRef } from 'react'
import { Upload, Camera, X, RefreshCw } from 'lucide-react'
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
            <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-muted border-2 border-border">
                    <img
                        src={preview}
                        alt="Selected"
                        className="w-full h-auto max-h-96 object-cover mx-auto"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground/70 truncate max-w-[70%]">{fileName}</p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        disabled={disabled}
                        className="ml-2"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Change
                    </Button>
                </div>
            </div>
        )
    }

    // --- VIEW 2: Active Live Camera Interface ---
    if (isCameraActive) {
        return (
            <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-black border-2 border-accent/40 aspect-square md:max-h-[500px] w-full flex items-center justify-center">                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        // We visually mirror the video stream element if using the front camera so it acts like a real mirror
                        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                    />

                    {/* Top overlay action to flip camera lens */}
                    <button
                        type="button"
                        onClick={toggleCamera}
                        className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                        title="Switch Camera"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>

                    {/* Top overlay action to cancel out */}
                    <button
                        type="button"
                        onClick={stopCamera}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-center">
                    <Button
                        type="button"
                        size="lg"
                        onClick={capturePhoto}
                        disabled={disabled}
                        className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-medium shadow-lg"
                    >
                        <Camera className="w-5 h-5 mr-2" />
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
                <p className="text-sm text-destructive text-center font-medium">{cameraError}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                    className="relative group p-6 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-card hover:bg-muted/50"
                >
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Upload Photo</p>
                            <p className="text-xs text-foreground/60">Browse your files</p>
                        </div>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => startCamera()}
                    disabled={disabled}
                    className="relative group p-6 rounded-xl border-2 border-dashed border-accent/30 hover:border-accent/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-card hover:bg-muted/50"
                >
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <Camera className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Take Photo</p>
                            <p className="text-xs text-foreground/60">Use your camera</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}