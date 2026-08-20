'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Camera,
  Moon,
  Sun,
  ArrowRight,
  UploadCloud,
  Users,
  ShieldCheck,
  BarChart3,
  QrCode,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react'

const FEATURES = [
  {
    icon: UploadCloud,
    title: 'Bulk Upload',
    description: 'Drop in your entire event gallery at once — thousands of photos, organized instantly.',
  },
  {
    icon: Sparkles,
    title: 'AI Face Matching',
    description: 'Guests find their own photos in seconds instead of scrolling through hundreds of images.',
  },
  {
    icon: QrCode,
    title: 'Shareable Event Code',
    description: 'One code gets every guest straight to their matches — no accounts required on their end.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Galleries stay locked behind your event code, and guests only ever see their own matches.',
  },
  {
    icon: BarChart3,
    title: 'Delivery Insights',
    description: 'Track how many guests have found their photos and how each gallery is performing.',
  },
  {
    icon: Users,
    title: 'Unlimited Guests',
    description: 'Every guest gets matched and a download link, with no per-guest fees to worry about.',
  },
]

const STEPS = [
  {
    step: '01',
    icon: UploadCloud,
    title: 'Create Your Event',
    description: 'Set up an event in seconds and get a unique code to share with your guests.',
  },
  {
    step: '02',
    icon: ImageIcon,
    title: 'Upload Your Gallery',
    description: 'Bulk upload your event photos and let our AI index every face in the gallery.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Guests Find Themselves',
    description: 'Guests upload a selfie and instantly get their own matched, downloadable photos.',
  },
]

const MOCK_EVENTS = [
  { name: 'Johnson & Smith Wedding', code: 'WED2024001', status: 'active', photos: 245 },
  { name: "Sarah's 30th Birthday", code: 'BDAY2024002', status: 'active', photos: 89 },
  { name: 'Tech Conference 2024', code: 'CORP2024003', status: 'inactive', photos: 512 },
]

export default function PhotographerLandingPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ImageFinder</span>
            </Link>

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
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                render={<Link href="/p/my-events" />}
                nativeButton={false}
              >
                Sign In
              </Button>
              <Button
                className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                render={<Link href="/p/my-events" />}
                nativeButton={false}
              >
                Sign Up
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
                <Camera className="h-3.5 w-3.5" />
                For Photographers
              </div>
              <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
                Your Photos.{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Automatically
                </span>{' '}
                Delivered.
              </h1>
              <p className="max-w-xl text-lg text-foreground/60 sm:text-xl">
                Upload your event gallery once and let AI match every guest to their own photos.
                No more massive zip files, no more &ldquo;which one is me?&rdquo; texts.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                render={<Link href="/p/my-events" />}
                nativeButton={false}
              >
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/p/my-events" />} nativeButton={false}>
                Sign In
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Unlimited guest matches</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both">
            <div className="glow-ring card-lift relative rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between pb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  My Events
                </span>
              </div>

              <div className="space-y-2.5">
                {MOCK_EVENTS.map((event) => (
                  <div
                    key={event.code}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <ImageIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{event.name}</p>
                        <p className="text-xs text-muted-foreground">{event.code}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={event.status === 'active' ? 'default' : 'outline'} className="capitalize">
                        {event.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{event.photos} photos</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/80">Guests matched</span>
                  <span className="font-medium text-foreground">182 / 240</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[76%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h2 className="text-3xl font-bold sm:text-4xl">Built for Event Photographers</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground/60">
              Everything you need to shoot, upload, and deliver an event gallery without the busywork
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Card
                key={feature.title}
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
              Three steps between your camera roll and a delivered gallery
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((item, i) => (
              <div
                key={item.step}
                style={{ animationDelay: `${i * 120}ms` }}
                className="card-lift relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both md:p-8"
              >
                <span className="pointer-events-none absolute -right-3 -bottom-6 text-[130px] leading-none font-black text-primary/[0.04]">
                  {item.step}
                </span>

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {item.step}
                    </span>
                    <item.icon className="h-6 w-6 shrink-0 text-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-foreground/60">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="glow-ring relative space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">Ready to Streamline Your Next Event?</h2>
          <p className="relative mx-auto max-w-2xl text-lg text-foreground/60">
            Join the photographers using AI to deliver galleries in a fraction of the time
          </p>
          <Button
            size="lg"
            className="relative shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            render={<Link href="/p/my-events" />}
            nativeButton={false}
          >
            Get Started Free
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ImageFinder</span>
          </div>
          <p>
            Looking for your own event photos?{' '}
            <Link href="/upload" className="font-medium text-primary hover:underline">
              Find them here
            </Link>
          </p>
          <p>&copy; 2026 ImageFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
