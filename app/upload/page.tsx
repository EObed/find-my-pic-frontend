'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageInput } from '@/components/ImageInput';
import { Loader } from '@/components/Loader';
import { ArrowLeft, AlertCircle, Moon, Sun, Mail } from 'lucide-react';
import Link from 'next/link';

// RFC 5322 standard compliant lightweight email regex validator
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function UploadPage() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [eventCode, setEventCode] = useState('')

    // 1. Added Email States to Parent Form
    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMounted(true)
        })

        return () => cancelAnimationFrame(id)
    }, []);

    // 2. Email validation check for the submit button
    const isEmailValid = EMAIL_REGEX.test(email)

    const handleImageSelected = (file: File) => {
        setSelectedImage(file)
        setError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        console.log({ email, eventCode, selectedImage })
    }

    return (
        <>
            {isLoading && <Loader />}

            <div className="min-h-screen bg-gradient-to-b from-background via-background to-card transition-colors duration-300">
                {/* Navigation */}
                <nav className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back</span>
                            </Link>
                            <h1 className="text-xl font-bold">Find Your Photos</h1>
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5 text-accent" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-primary" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Instructions */}
                        <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                            <h2 className="text-lg font-semibold">How to find your photos:</h2>
                            <ol className="space-y-2 text-foreground/70 text-sm">
                                <li className="flex gap-3">
                                    <span className="text-primary font-semibold min-w-6">1.</span>
                                    <span>Enter your email and the code provided by the photographer</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-semibold min-w-6">2.</span>
                                    <span>Upload a clear photo or take a live picture of yourself</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-semibold min-w-6">3.</span>
                                    <span>Wait for our AI to find matching photos from the event</span>
                                </li>
                            </ol>
                        </div>

                        {/* 3. New Email Input Section with Validation Notice */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                                    Email Address <span className="text-primary">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
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
                                        className={`pl-10 bg-card ${
                                            emailTouched && !isEmailValid
                                                ? 'border-destructive focus-visible:ring-destructive'
                                                : 'border-border focus-visible:ring-primary'
                                        }`}
                                    />
                                </div>
                                {emailTouched && !isEmailValid && (
                                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" /> Please enter a valid email address.
                                    </p>
                                )}
                            </div>

                            {/* Explanatory Note */}
                            <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
                                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    <strong>Important Note:</strong> Please use a correct and valid email. A secure link to download your high-resolution matched event pictures will be sent directly to this inbox.
                                </p>
                            </div>
                        </div>

                        {/* Event Code Section */}
                        <div className="space-y-4">
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
                                className="bg-card border-border focus:border-primary"
                            />
                            <p className="text-xs text-foreground/60">
                                Ask the photographer for the event code to find your photos
                            </p>
                        </div>

                        {/* Image Input Section */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">
                                    Your Photo <span className="text-primary">*</span>
                                </label>
                                <ImageInput
                                    onImageSelected={handleImageSelected}
                                    // Pass down email validation state to disable internal camera triggers if email is bad
                                    disabled={isLoading || !isEmailValid}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
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
                                // 4. Button stays disabled until all 3 criteria are perfectly satisfied
                                disabled={isLoading || !selectedImage || !eventCode.trim() || !isEmailValid}
                                className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-shadow"
                            >
                                {isLoading ? 'Processing...' : 'Find My Photos'}
                            </Button>
                        </div>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border text-center space-y-2">
                        <p className="text-sm text-foreground/70">
                            💡 <span className="font-semibold">Tip:</span> Use a clear, well-lit photo for better matching accuracy
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}