'use client'

import { useState, type CSSProperties } from 'react'
import { Upload, Sparkles, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StepAnimation } from '@/components/landing/StepAnimation'
import uploadAnimation from '@/components/landing/lottie/upload.json'
import analysisAnimation from '@/components/landing/lottie/analysis.json'
import downloadAnimation from '@/components/landing/lottie/download.json'

const STEPS = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your Photo',
    description: 'Take a clear selfie or photo and upload it to our platform. Any photo of yourself works.',
    animation: uploadAnimation,
    restFrame: 76,
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your appearance, facial features, and clothing for accurate matching.',
    animation: analysisAnimation,
    restFrame: 62,
  },
  {
    step: '03',
    icon: Download,
    title: 'Download & Share',
    description: 'Get your matched photos instantly and download them in high resolution.',
    animation: downloadAnimation,
    restFrame: 40,
  },
]

/** Hover-to-expand step cards — the only interactive part of the landing page. */
export function HowItWorksSteps() {
  const [activeStep, setActiveStep] = useState(0)

  return (
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

                {/* Action-specific Lottie animation */}
                <StepAnimation
                    data={item.animation}
                    active={isActive}
                    restFrame={item.restFrame}
                    className="my-4 h-44 md:my-2 md:h-auto md:min-h-0 md:flex-1"
                />

                <div className="space-y-2">
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
  )
}
