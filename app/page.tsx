import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Camera,
  CircleCheck,
  Download,
  GraduationCap,
  Heart,
  LockKeyhole,
  Music,
  PartyPopper,
  ScanFace,
  Smartphone,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HowItWorksSteps } from '@/components/landing/HowItWorksSteps'
import { MatchDemo } from '@/components/landing/MatchDemo'
import { Reveal } from '@/components/motion/Reveal'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import { Faq } from '@/components/site/Faq'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '/p', label: 'For photographers' },
]

const EVENT_TYPES = [
  { icon: Heart, label: 'Weddings' },
  { icon: GraduationCap, label: 'Graduations' },
  { icon: Briefcase, label: 'Conferences' },
  { icon: Trophy, label: 'Marathons' },
  { icon: Music, label: 'Concerts' },
  { icon: PartyPopper, label: 'Birthdays' },
  { icon: Camera, label: 'Photo booths' },
]

const FEATURES = [
  {
    icon: ScanFace,
    title: 'Face matching that just works',
    description:
      'Upload one clear selfie and we compare it against every photo from the event — no tagging, no scrolling through hundreds of shots.',
    className: 'md:col-span-2',
  },
  {
    icon: Zap,
    title: 'Results in seconds',
    description: 'Matches appear as soon as the scan finishes, ranked by confidence.',
  },
  {
    icon: LockKeyhole,
    title: 'Private by design',
    description: 'Galleries sit behind the event code, and you only ever see photos that match you.',
  },
  {
    icon: Smartphone,
    title: 'Selfie or upload',
    description: 'Snap a photo with your camera right in the browser, or pick one from your device.',
  },
  {
    icon: Download,
    title: 'Full-resolution downloads',
    description: 'Pick your favourites or grab them all at the quality the photographer delivered.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Where do I get the event code?',
    answer:
      'The photographer shares it — usually on a card at the event, in the invitation, or by message afterwards. It looks something like WED2024001.',
  },
  {
    question: 'What kind of photo should I upload?',
    answer:
      'A clear, well-lit photo of your face works best. Look at the camera, avoid sunglasses, and make sure you are the only person in the shot.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. Guests only need the event code and a photo of themselves.',
  },
  {
    question: 'Can other people see my matches?',
    answer:
      'No. Your matches are shown only to you, right in your browser, and you download them directly from there.',
  },
]

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader
        links={NAV_LINKS}
        actions={
          <Button render={<Link href="/upload" />} nativeButton={false}>
            Find my photos
          </Button>
        }
      />

      {/* Hero */}
      <section className="relative">
        <div className="bg-dots pointer-events-none absolute inset-0 -top-24" />
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 left-[-15%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-28">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
              href="/p"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 py-1 pr-3 pl-1 text-xs font-medium text-foreground/80 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">New</span>
              Photographers can now deliver galleries in one link
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <h1 className="text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-7xl">
              Find every photo of you. <span className="text-gradient">In seconds.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Upload a selfie, enter the event code, and our AI pulls every photo you appear in from the photographer&apos;s gallery.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/upload" />} nativeButton={false}>
                Find my photos
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button size="lg" variant="outline" render={<a href="#how-it-works" />} nativeButton={false}>
                See how it works
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['No account needed', 'Just one selfie', 'Only you see your matches'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both">
            <MatchDemo />
          </div>
        </div>
      </section>

      {/* Event types marquee */}
      <section aria-label="Event types" className="border-y border-border bg-card/40 py-6">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-12 pr-12 hover:[animation-play-state:paused]">
            {[...EVENT_TYPES, ...EVENT_TYPES].map((type, i) => (
              <span key={i} aria-hidden={i >= EVENT_TYPES.length} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <type.icon className="h-4 w-4 text-primary/70" />
                {type.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
        <Reveal className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Features</p>
          <h2 className="text-4xl font-semibold text-balance sm:text-5xl">Everything you need to get your photos</h2>
          <p className="text-lg text-muted-foreground">No more scrolling through a 2,000-photo gallery hoping to spot yourself.</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 70} className={feature.className}>
              <SpotlightCard className="h-full p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-primary/15">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className={cn('mb-2 font-semibold', i === 0 ? 'text-2xl' : 'text-lg')}>{feature.title}</h3>
                <p className={cn('leading-relaxed text-muted-foreground', i === 0 && 'max-w-md text-lg')}>{feature.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">How it works</p>
            <h2 className="text-4xl font-semibold text-balance sm:text-5xl">Three steps to your photos</h2>
            <p className="text-lg text-muted-foreground">Hover a step to see what happens behind the scenes.</p>
          </Reveal>
          <Reveal>
            <HowItWorksSteps />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
        <Reveal className="mb-10 space-y-4 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">FAQ</p>
          <h2 className="text-4xl font-semibold sm:text-5xl">Questions, answered</h2>
        </Reveal>
        <Reveal>
          <Faq items={FAQ_ITEMS} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_45%)] px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
          <Sparkles className="relative mx-auto mb-5 h-8 w-8 opacity-90" />
          <h2 className="relative text-4xl font-semibold text-balance sm:text-5xl">Were you at an event recently?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg opacity-85">
            Grab the event code from your photographer and see every shot you&apos;re in.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="relative mt-8 bg-background text-foreground shadow-lg hover:bg-background/90"
            render={<Link href="/upload" />}
            nativeButton={false}
          >
            Start matching
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  )
}
