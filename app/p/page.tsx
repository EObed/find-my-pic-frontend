import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CircleCheck,
  Image as ImageIcon,
  QrCode,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CountUp } from '@/components/motion/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import { Faq } from '@/components/site/Faq'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'

export const metadata: Metadata = { title: 'For Photographers' }

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '/', label: 'For guests' },
]

const FEATURES = [
  {
    icon: UploadCloud,
    title: 'Bulk upload',
    description: 'Drop in the whole gallery at once — every face is indexed automatically.',
  },
  {
    icon: Sparkles,
    title: 'AI face matching',
    description: 'Guests find their own photos in seconds instead of messaging you “which ones am I in?”.',
  },
  {
    icon: QrCode,
    title: 'One shareable code',
    description: 'Each event gets a code. Guests use it to reach their matches — no accounts on their side.',
  },
  {
    icon: ShieldCheck,
    title: 'Private galleries',
    description: 'Galleries stay behind the event code, and guests only ever see photos they appear in.',
  },
  {
    icon: BarChart3,
    title: 'Delivery insights',
    description: 'See how many guests searched, how many found themselves, and which events perform best.',
  },
  {
    icon: Users,
    title: 'Every guest included',
    description: 'Each guest gets their own matches and download link, however big the event.',
  },
]

const STEPS = [
  { title: 'Create your event', description: 'Name it, set the date, and get a unique code to share with guests.' },
  { title: 'Upload your gallery', description: 'Bulk upload your edited photos. We index every face in the background.' },
  { title: 'Guests find themselves', description: 'Guests upload a selfie and instantly get their own photos to download.' },
]

const PREVIEW_EVENTS = [
  { name: 'Johnson & Smith Wedding', code: 'WED2024001', status: 'active', photos: 245 },
  { name: "Sarah's 30th Birthday", code: 'BDAY2024002', status: 'active', photos: 89 },
  { name: 'Tech Conference 2024', code: 'CORP2024003', status: 'inactive', photos: 512 },
]

const FAQ_ITEMS = [
  {
    question: 'Do my guests need an account?',
    answer: 'No. Guests only enter their email, the event code, and a selfie. Accounts are just for photographers.',
  },
  {
    question: 'How do guests get the event code?',
    answer:
      'Each event gets a code when you create it. Share it however suits you — a printed card, the invitation, or a message after the event.',
  },
  {
    question: 'Can I turn an event off?',
    answer: 'Yes. Inactive events stop returning matches, so you control how long a gallery stays available.',
  },
]

export default function PhotographerLandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader
        logoHref="/p"
        links={NAV_LINKS}
        actions={
          <>
            <Button variant="ghost" render={<Link href="/p/login" />} nativeButton={false}>
              Sign in
            </Button>
            <Button render={<Link href="/p/signup" />} nativeButton={false}>
              Get started
            </Button>
          </>
        }
      />

      {/* Hero */}
      <section className="relative">
        <div className="bg-dots pointer-events-none absolute inset-0 -top-24" />
        <div className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-[-15%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-28">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              <ImageIcon className="h-3.5 w-3.5" />
              For photographers
            </span>

            <h1 className="text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-7xl">
              Your photos. <span className="text-gradient">Delivered automatically.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Upload your event gallery once and let AI match every guest to their own photos. No more massive zip files, no more
              &ldquo;which one is me?&rdquo; texts.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/p/signup" />} nativeButton={false}>
                Get started free
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/p/login" />} nativeButton={false}>
                Sign in
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['Free to start', 'No guest accounts', 'Works on any device'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard preview */}
          <div className="animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both">
            <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--primary),transparent_40%)] backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between pb-5">
                <p className="font-semibold">My events</p>
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pb-5">
                {[
                  { label: 'Events', value: 3 },
                  { label: 'Photos', value: 846 },
                  { label: 'Guests matched', value: 182 },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-muted/60 p-3">
                    <CountUp value={stat.value} className="block font-mono text-xl font-semibold tabular-nums" />
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {PREVIEW_EVENTS.map((event) => (
                  <div
                    key={event.code}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3 transition-all duration-300 hover:translate-x-1 hover:border-primary/30"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <ImageIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{event.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{event.code}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge variant={event.status === 'active' ? 'default' : 'outline'} className="capitalize">
                        {event.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{event.photos} photos</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-muted/60 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Guests who found their photos</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                  <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Features</p>
            <h2 className="text-4xl font-semibold text-balance sm:text-5xl">Built for event photographers</h2>
            <p className="text-lg text-muted-foreground">Shoot, upload, and deliver a gallery without the busywork.</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60}>
                <SpotlightCard className="h-full p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-primary/15">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">How it works</p>
            <h2 className="text-4xl font-semibold text-balance sm:text-5xl">From camera roll to delivered gallery</h2>
          </Reveal>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {/* connecting line */}
            <div className="pointer-events-none absolute top-6 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 md:block" />
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 120} className="relative text-center">
                <span className="relative mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-mono text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--primary),transparent_30%)] ring-4 ring-background">
                  0{i + 1}
                </span>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="mx-auto max-w-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
        <Reveal className="mb-10 space-y-4 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">FAQ</p>
          <h2 className="text-4xl font-semibold sm:text-5xl">Good to know</h2>
        </Reveal>
        <Reveal>
          <Faq items={FAQ_ITEMS} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_45%)] px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
          <h2 className="relative text-4xl font-semibold text-balance sm:text-5xl">Ready for your next event?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg opacity-85">
            Create an event in under a minute and let your guests do the searching.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="relative mt-8 bg-background text-foreground shadow-lg hover:bg-background/90"
            render={<Link href="/p/signup" />}
            nativeButton={false}
          >
            Get started free
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  )
}
