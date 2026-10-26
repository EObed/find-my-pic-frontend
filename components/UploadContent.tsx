'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/ImageInput';
import { Loader } from '@/components/Loader';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { ArrowLeft, AlertCircle, Check, Hash, ImageIcon, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { ResultsHeader } from '@/components/ResultsHeader';
import { ImageSelectionGrid, type MatchedImage } from '@/components/ImageSelectionGrid';
import { PhotographerCredit } from '@/components/PhotographerCredit';
import { generateMockPhotographer } from '@/lib/mockPhotographer';
import type { PhotographerSummary } from '@/interfaces/Photographer';

const generateMockMatches = (seed: string): MatchedImage[] =>
    Array.from({ length: 9 }, (_, i) => ({
        id: `${seed}-${i}`,
        preview: `https://picsum.photos/seed/${encodeURIComponent(seed)}-${i}/600/600`,
        matchScore: Math.floor(Math.random() * 24) + 75,
    })).sort((a, b) => b.matchScore - a.matchScore)

const TIPS = ['Face the camera in good light', 'Remove sunglasses or hats', 'Make sure you are the only person in the shot']

export function UploadContent({ initialCode = '' }: { initialCode?: string }) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [eventCode, setEventCode] = useState(initialCode)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [showResults, setShowResults] = useState(false)
    const [matchedImages, setMatchedImages] = useState<MatchedImage[]>([])
    const [selectedImageIds, setSelectedImageIds] = useState<string[]>([])
    const [photographer, setPhotographer] = useState<PhotographerSummary | null>(null)

    const handleBackToUpload = () => {
        setShowResults(false)
        setMatchedImages([])
        setSelectedImageIds([])
        setPhotographer(null)
        setSelectedImage(null)
        setError(null)
    }

    const isEventCodeValid = eventCode.trim().length > 0
    const isPhotoSelected = !!selectedImage

    const steps = [
        { label: 'Event code', done: isEventCodeValid, icon: Hash },
        { label: 'Photo', done: isPhotoSelected, icon: ImageIcon },
    ]
    const completed = steps.filter((step) => step.done).length

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

    const handleToggleAll = () => {
        setSelectedImageIds((prev) => (prev.length === matchedImages.length ? [] : matchedImages.map((img) => img.id)))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // TODO: replace with real matching API call
            await new Promise((resolve) => setTimeout(resolve, 2200))

            const matches = generateMockMatches(eventCode)
            const { id, name, avatarUrl } = generateMockPhotographer('ph-001')
            setMatchedImages(matches)
            setPhotographer({ id, name, avatarUrl })
            setSelectedImageIds([])
            setShowResults(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
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

            <div className="relative min-h-screen overflow-x-clip bg-background">
                <div className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-96" />
                <div className="pointer-events-none absolute -top-40 -right-24 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[110px]" />
                <div className="pointer-events-none absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />

                {/* Navigation */}
                <nav className="glass sticky top-0 z-40 border-b border-border">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {showResults ? (
                            <button
                                type="button"
                                onClick={handleBackToUpload}
                                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                New search
                            </button>
                        ) : (
                            <Logo />
                        )}
                        <ThemeToggle />
                    </div>
                </nav>

                <div className={cn('relative mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8', showResults ? 'max-w-7xl' : 'max-w-2xl')}>
                    {showResults ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <ResultsHeader
                                totalCount={matchedImages.length}
                                selectedCount={selectedImageIds.length}
                                onDownload={() => handleDownload(false)}
                                onDownloadAll={() => handleDownload(true)}
                                onToggleAll={handleToggleAll}
                                isLoadingResults={false}
                            />

                            <ImageSelectionGrid
                                images={matchedImages}
                                selectedImageIds={selectedImageIds}
                                onImageSelect={handleImageSelection}
                                isLoading={false}
                            />

                            {photographer && <PhotographerCredit photographer={photographer} />}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h1 className="text-4xl font-semibold sm:text-5xl">Find your photos</h1>
                                <p className="text-muted-foreground">Two quick details and we&apos;ll search the event gallery for you.</p>
                            </div>

                            {/* Step progress */}
                            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 fill-mode-both">
                                <div className="flex items-center justify-between gap-2">
                                    {steps.map((step) => (
                                        <div key={step.label} className="flex items-center gap-2 text-sm">
                                            <span
                                                className={cn(
                                                    'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300',
                                                    step.done ? 'scale-100 bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                                )}
                                            >
                                                {step.done ? <Check className="h-3.5 w-3.5 animate-in zoom-in duration-300" /> : <step.icon className="h-3.5 w-3.5" />}
                                            </span>
                                            <span className={cn('font-medium transition-colors', step.done ? 'text-foreground' : 'text-muted-foreground')}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-out"
                                        style={{ width: `${(completed / steps.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-5 rounded-2xl border border-border bg-card/80 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
                                <div className="space-y-2">
                                    <label htmlFor="eventCode" className="block text-sm font-medium text-foreground">
                                        Event code
                                    </label>
                                    <div className="relative">
                                        <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="eventCode"
                                            type="text"
                                            placeholder="e.g. WEDDING2026"
                                            value={eventCode}
                                            onChange={(e) => {
                                                setEventCode(e.target.value.toUpperCase())
                                                setError(null)
                                            }}
                                            disabled={isLoading}
                                            autoCapitalize="characters"
                                            className="pl-10 font-mono tracking-wider"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Your photographer shares this code with guests.</p>
                                </div>
                            </div>

                            {/* Photo */}
                            <div className="space-y-4 rounded-2xl border border-border bg-card/80 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
                                <p className="text-sm font-medium text-foreground">Your photo</p>
                                <ImageInput onImageSelected={handleImageSelected} disabled={isLoading} />

                                <div className="flex gap-3 rounded-xl bg-primary/5 p-3.5">
                                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <ul className="space-y-1 text-xs text-foreground/80">
                                        {TIPS.map((tip) => (
                                            <li key={tip}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 animate-in fade-in">
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                <Button type="button" variant="outline" size="lg" className="sm:flex-1" render={<Link href="/" />} nativeButton={false}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading || !selectedImage || !isEventCodeValid}
                                    className="sm:flex-[2]"
                                >
                                    {isLoading ? 'Searching…' : completed === steps.length ? 'Find my photos' : `${steps.length - completed} step${steps.length - completed === 1 ? '' : 's'} to go`}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
