'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageInput } from '@/components/ImageInput';
import { Loader } from '@/components/Loader';
import { ArrowLeft, AlertCircle, Moon, Sun, Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ResultsHeader } from '@/components/ResultsHeader';
import { ImageSelectionGrid, type MatchedImage } from '@/components/ImageSelectionGrid';

// RFC 5322 standard compliant lightweight email regex validator
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const generateMockMatches = (seed: string): MatchedImage[] =>
    Array.from({ length: 9 }, (_, i) => ({
        id: `${seed}-${i}`,
        preview: `https://picsum.photos/seed/${encodeURIComponent(seed)}-${i}/600/600`,
        matchScore: Math.floor(Math.random() * 24) + 75,
    })).sort((a, b) => b.matchScore - a.matchScore)

export default function UploadPage() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [eventCode, setEventCode] = useState('')

    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showResults, setShowResults] = useState(false)
    const [matchedImages, setMatchedImages] = useState<MatchedImage[]>([])
    const [selectedImageIds, setSelectedImageIds] = useState<string[]>([])

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMounted(true)
        })

        return () => cancelAnimationFrame(id)
    }, []);

    const handleBackToUpload = () => {
        setShowResults(false)
        setMatchedImages([])
        setSelectedImageIds([])
        setSelectedImage(null)
        setEventCode('')
        setError(null)
    }

    const isEmailValid = EMAIL_REGEX.test(email)
    const isEventCodeValid = eventCode.trim().length > 0
    const isPhotoSelected = !!selectedImage

    const steps = [
        { label: 'Email', done: isEmailValid },
        { label: 'Event code', done: isEventCodeValid },
        { label: 'Photo', done: isPhotoSelected },
    ]

    const handleImageSelected = (file: File) => {
        setSelectedImage(file)
        setError(null)
    }

    const handleImageSelection = (imageId: string) => {
        setSelectedImageIds((prev) =>
            prev.includes(imageId)
                ? prev.filter((id) => id !== imageId)
                : [...prev, imageId]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // TODO: replace with real matching API call
            await new Promise((resolve) => setTimeout(resolve, 2200))

            const matches = generateMockMatches(eventCode || email)
            setMatchedImages(matches)
            setSelectedImageIds([])
            setShowResults(true)
        } catch {
            setError('Something went wrong while searching for your photos. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownload = async (downloadAll: boolean) => {
        const idsToDownload = downloadAll ? matchedImages.map((img) => img.id) : selectedImageIds

        if (idsToDownload.length === 0) {
            toast.error('Please select at least one image to download')
            return
        }

        toast.success(`Preparing ${idsToDownload.length} image${idsToDownload.length > 1 ? 's' : ''} for download`)
    }

    return (
        <>
            {isLoading && (
                <Loader
                    title="Finding your photos"
                    description="Our AI is scanning the event gallery for your best matches..."
                />
            )}

            <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
                <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
                <div className="pointer-events-none absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

                {/* Navigation */}
                <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <button
                                onClick={showResults ? handleBackToUpload : () => router.push('/')}
                                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="hidden sm:inline">{showResults ? 'Back' : 'Home'}</span>
                            </button>
                            <h1 className="text-xl font-bold">{showResults ? 'Your Matched Photos' : 'Find Your Photos'}</h1>
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="h-5 w-5 text-accent" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-primary" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className={`relative mx-auto ${showResults ? 'max-w-7xl' : 'max-w-3xl'} px-4 py-12 sm:px-6 sm:py-16 lg:px-8`}>
                    {showResults ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <ResultsHeader
                                totalCount={matchedImages.length}
                                selectedCount={selectedImageIds.length}
                                onDownload={() => handleDownload(false)}
                                onDownloadAll={() => handleDownload(true)}
                                isLoadingResults={false}
                            />

                            <ImageSelectionGrid
                                images={matchedImages}
                                selectedImageIds={selectedImageIds}
                                onImageSelect={handleImageSelection}
                                isLoading={false}
                            />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Step progress */}
                            <div className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                {steps.map((step, i) => (
                                    <div key={step.label} className="flex items-center gap-2">
                                        <div
                                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                                                step.done
                                                    ? 'border-primary/30 bg-primary/10 text-primary'
                                                    : 'border-border text-muted-foreground'
                                            }`}
                                        >
                                            {step.done ? <Check className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 text-center leading-none">{i + 1}</span>}
                                            {step.label}
                                        </div>
                                        {i < steps.length - 1 && <div className="h-px w-4 bg-border" />}
                                    </div>
                                ))}
                            </div>

                            {/* Instructions */}
                            <div className="card-lift space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-lg font-semibold">How to find your photos:</h2>
                                <ol className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-3">
                                        <span className="min-w-6 font-semibold text-primary">1.</span>
                                        <span>Enter your email and the code provided by the photographer</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="min-w-6 font-semibold text-primary">2.</span>
                                        <span>Upload a clear photo or take a live picture of yourself</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="min-w-6 font-semibold text-primary">3.</span>
                                        <span>Wait for our AI to find matching photos from the event</span>
                                    </li>
                                </ol>
                            </div>

                            {/* Email Input Section */}
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 fill-mode-both">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                                        Email Address <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setError(null)
                                            }}
                                            onBlur={() => setEmailTouched(true)}
                                            disabled={isLoading}
                                            className={`bg-card pl-10 ${
                                                emailTouched && !isEmailValid
                                                    ? 'border-destructive focus-visible:ring-destructive'
                                                    : 'border-border focus-visible:ring-primary'
                                            }`}
                                        />
                                    </div>
                                    {emailTouched && !isEmailValid && (
                                        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                                            <AlertCircle className="h-3 w-3" /> Please enter a valid email address.
                                        </p>
                                    )}
                                </div>

                                {/* Explanatory Note */}
                                <div className="flex gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3.5">
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                    <p className="text-xs leading-relaxed text-foreground/80">
                                        <strong>Important Note:</strong> Please use a correct and valid email. A secure link to download your high-resolution matched event pictures will be sent directly to this inbox.
                                    </p>
                                </div>
                            </div>

                            {/* Event Code Section */}
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
                                <label htmlFor="eventCode" className="block text-sm font-semibold text-foreground">
                                    Event Code <span className="text-primary">*</span>
                                </label>
                                <Input
                                    id="eventCode"
                                    type="text"
                                    placeholder="Enter the event code (e.g., WEDDING2026)"
                                    value={eventCode}
                                    onChange={(e) => {
                                        setEventCode(e.target.value)
                                        setError(null)
                                    }}
                                    disabled={isLoading}
                                    className="border-border bg-card focus:border-primary"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Ask the photographer for the event code to find your photos
                                </p>
                            </div>

                            {/* Image Input Section */}
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-foreground">
                                        Your Photo <span className="text-primary">*</span>
                                    </label>
                                    <ImageInput
                                        onImageSelected={handleImageSelected}
                                        disabled={isLoading || !isEmailValid}
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 animate-in fade-in">
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.back()}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !selectedImage || !eventCode.trim() || !isEmailValid}
                                    className="flex-1 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                                >
                                    {isLoading ? 'Processing...' : 'Find My Photos'}
                                </Button>
                            </div>

                            <div className="mt-12 space-y-2 rounded-xl border border-border bg-muted/50 p-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Tip:</span> Use a clear, well-lit photo for better matching accuracy
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}