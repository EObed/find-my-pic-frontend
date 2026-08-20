import Link from 'next/link'
import type { Metadata } from 'next'
import { Aperture, ArrowLeft, Camera, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Out of Focus — Find My Pic',
  description: "The page you're looking for couldn't be found.",
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-20 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-xl space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <ImageOff className="h-3.5 w-3.5" />
          Error 404
        </div>

        {/* Viewfinder */}
        <div className="group relative mx-auto flex h-48 w-48 items-center justify-center">
          <span className="absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-2 border-l-2 border-primary/40" />
          <span className="absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-2 border-r-2 border-primary/40" />
          <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-primary/40" />
          <span className="absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-2 border-b-2 border-primary/40" />

          <Aperture className="absolute h-36 w-36 text-primary/10 animate-[spin_18s_linear_infinite]" />
          <span className="relative text-5xl font-black tracking-tight text-foreground/80 blur-[2px] transition-all duration-500 group-hover:blur-none">
            404
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold sm:text-4xl">Out of Focus</h1>
          <p className="mx-auto max-w-md text-lg text-foreground/60">
            We scanned the whole gallery and couldn&apos;t find a match for this page.
            Hover the lens to bring it into focus, or head somewhere that actually exists.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Home
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/upload" />} nativeButton={false}>
            <Camera className="mr-1.5 h-4 w-4" />
            Find My Photos
          </Button>
        </div>
      </div>
    </div>
  )
}
