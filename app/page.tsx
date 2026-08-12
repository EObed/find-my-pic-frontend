'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { Moon, Sun, Upload, Sparkles, Users, Download, Camera, LockKeyhole, FileStack, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation";
import { cn } from '@/lib/utils'
import { UploadDiagram, AnalysisDiagram, DownloadDiagram } from '@/components/landing/StepDiagrams'

const FEATURES = [
  {
    icon: Upload,
    title: 'Smart Upload',
    description: 'Upload any photo and our AI analyzes your appearance instantly',
  },
  {
    icon: Sparkles,
    title: 'AI Powered Matching',
    description: 'Advanced face and appearance recognition finds your photos in seconds',
  },
  {
    icon: Download,
    title: 'One-Click Download',
    description: 'Download high-resolution event photos directly to your device',
  },
  {
    icon: Users,
    title: 'Connect Photographers',
    description: 'Professional photographers upload and manage their event galleries',
  },
  {
    icon: LockKeyhole,
    title: 'Secure & Private',
    description: 'Your photos are encrypted and only you can access your matches',
  },
  {
    icon: FileStack,
    title: 'Batch Processing',
    description: 'Process multiple photos at once for comprehensive event coverage',
  },
]

const STEPS = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your Photo',
    description: 'Take a clear selfie or photo and upload it to our platform. Any photo of yourself works.',
    Diagram: UploadDiagram,
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your appearance, facial features, and clothing for accurate matching.',
    Diagram: AnalysisDiagram,
  },
  {
    step: '03',
    icon: Download,
    title: 'Download & Share',
    description: 'Get your matched photos instantly and download them in high resolution.',
    Diagram: DownloadDiagram,
  },
]

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => cancelAnimationFrame(id)
  }, []);

  function handleGetStarted () {
    router.push("/upload");
  }

  return (
      <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                  <Camera className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                ImageFinder
              </span>
              </div>

              <div className="hidden items-center gap-8 md:flex">
                <a href="#features" className="text-foreground/70 transition-colors hover:text-foreground">
                  Features
                </a>
                <a href="#how-it-works" className="text-foreground/70 transition-colors hover:text-foreground">
                  How It Works
                </a>
              </div>

              <div className="flex items-center gap-4">
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
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
                <Button onClick={handleGetStarted} className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-powered photo matching
                </div>
                <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Event Photos
                </span>
                  {' '}Instantly
                </h1>
                <p className="max-w-xl text-lg text-foreground/60 sm:text-xl">
                  Upload your image and let our AI find professional photos of you from any event. Fast, accurate, and magical.
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Button onClick={handleGetStarted} size="lg" className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
                  Upload Your Photo
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Results in seconds</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both">
              <div className="glow-ring card-lift relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-center justify-between pb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Live matching
                  </span>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <Image
                      src="https://i.pravatar.cc/640?img=68"
                      alt="A person whose photo is being matched against event photos"
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                  <div className="scan-line absolute inset-x-0 h-1/3 bg-primary/20 blur-md" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    Your photo
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    { img: 12, score: 97 },
                    { img: 33, score: 92 },
                    { img: 47, score: 88 },
                    { img: 59, score: 81 },
                  ].map(({ img, score }) => (
                      <div key={img} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                        <Image
                            src={`https://i.pravatar.cc/160?img=${img}`}
                            alt="Matching event photo"
                            fill
                            sizes="120px"
                            className="object-cover"
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                          {score}%
                        </span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-3xl font-bold sm:text-4xl">Powerful Features</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground/60">
                Everything you need to find and download your event photos
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {FEATURES.map((feature, i) => (
                  <Card
                      key={i}
                      style={{ animationDelay: `${i * 80}ms` }}
                      className="card-lift border border-border p-6 shadow-xs transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 fill-mode-both hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground/60">
                Three simple steps to find your photos
              </p>
            </div>

            <div
                className="flex flex-col gap-4 md:h-[440px] md:flex-row"
                onMouseLeave={() => setActiveStep(0)}
            >
              {STEPS.map((item, i) => {
                const isActive = activeStep === i
                const accent = i % 2 === 0 ? 'primary' : 'accent'
                return (
                    <div
                        key={i}
                        onMouseEnter={() => setActiveStep(i)}
                        style={{ animationDelay: `${i * 120}ms`, ['--grow' as string]: isActive ? 2.6 : 1 } as CSSProperties}
                        className={cn(
                            'card-lift group/step relative min-w-0 flex-1 overflow-hidden rounded-2xl border bg-card p-6 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both md:flex-grow-[var(--grow)] md:p-8 md:transition-[flex-grow] md:duration-500 md:ease-in-out',
                            isActive ? 'border-primary/40 shadow-lg' : 'border-border'
                        )}
                    >
                      {/* Ambient glow */}
                      <div
                          className={cn(
                              'pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 animate-float',
                              accent === 'primary' ? 'bg-primary/10' : 'bg-accent/10',
                              isActive ? 'opacity-100' : 'opacity-30'
                          )}
                      />

                      {/* Action-specific animated diagram */}
                      <item.Diagram active={isActive} />

                      <span className="pointer-events-none absolute -right-3 -bottom-6 text-[130px] leading-none font-black text-primary/[0.04] transition-all duration-500 md:-right-4 md:text-[160px] group-hover/step:text-primary/[0.08]">
                        {item.step}
                      </span>

                      <div className="relative flex h-full flex-col justify-between md:min-h-0">
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                            {item.step}
                          </span>
                          <item.icon
                              className={cn(
                                  'h-6 w-6 shrink-0 text-primary/50 transition-all duration-300',
                                  isActive ? 'md:opacity-100' : 'md:opacity-0'
                              )}
                          />
                        </div>

                        <div className="mt-6 space-y-2 md:mt-0">
                          <h3 className="truncate text-xl font-semibold">{item.title}</h3>
                          <p
                              className={cn(
                                  'text-foreground/60 transition-all duration-500 md:max-w-xs',
                                  isActive ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-2 md:opacity-0'
                              )}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="glow-ring relative space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">Ready to Find Your Photos?</h2>
            <p className="relative mx-auto max-w-2xl text-lg text-foreground/60">
              Join thousands of users who are discovering their event photos instantly
            </p>
            <Button onClick={handleGetStarted} size="lg" className="relative shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
              Start Matching Now
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Camera className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold">ImageFinder</span>
                </div>
                <p className="text-sm text-foreground/60">Find your event photos with AI</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Product</h4>
                <div className="text-sm text-foreground/60">
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors block">
                    Security
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Legal</h4>
                <div className="text-sm text-foreground/60">
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors block">
                    Terms and Conditions
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-foreground/60 sm:flex-row">
              <p>&copy; 2026 ImageFinder. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}