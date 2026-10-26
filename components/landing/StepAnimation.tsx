'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useTheme } from 'next-themes'
import type { AnimationItem } from 'lottie-web'
import { cn } from '@/lib/utils'

type ColorToken = 'primary' | 'accent' | 'ink' | 'card' | 'onPrimary'

/** Mirrors the --primary / --accent / --foreground / --card tokens in globals.css. */
const PALETTES: Record<'light' | 'dark', Record<ColorToken, string>> = {
  light: { primary: '#3f6bc4', accent: '#6fc4dd', ink: '#2b3651', card: '#ffffff', onPrimary: '#ffffff' },
  dark: { primary: '#7f9fe0', accent: '#5fb8d6', ink: '#e7eef8', card: '#1b2945', onPrimary: '#121a2c' },
}

function hexToLottie(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255).concat(1)
}

/**
 * Fills and strokes in the animation JSON are named `c:<token>`;
 * swap their colors for the current theme's palette.
 */
function tint(data: object, palette: Record<ColorToken, string>) {
  const copy = structuredClone(data)
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!node || typeof node !== 'object') return
    const obj = node as Record<string, unknown>
    if (typeof obj.nm === 'string' && obj.nm.startsWith('c:') && (obj.ty === 'fl' || obj.ty === 'st')) {
      const token = obj.nm.slice(2) as ColorToken
      if (palette[token]) obj.c = { a: 0, k: hexToLottie(palette[token]) }
    }
    Object.values(obj).forEach(walk)
  }
  walk(copy)
  return copy
}

/** Plays a Lottie animation while `active`; rests on `restFrame` otherwise or when motion is reduced. */
export function StepAnimation({
  data,
  active,
  restFrame,
  className,
}: {
  data: object
  active: boolean
  restFrame: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const activeRef = useRef(active)

  const { resolvedTheme } = useTheme()
  const animationData = useMemo(
    () => tint(data, PALETTES[resolvedTheme === 'light' ? 'light' : 'dark']),
    [data, resolvedTheme]
  )

  // lottie-web touches `document` at import time, so load it on the client only.
  useEffect(() => {
    let cancelled = false
    import('lottie-web/build/player/lottie_light').then(({ default: lottie }) => {
      if (cancelled || !containerRef.current) return
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
      })
      animationRef.current = animation
      sync(animation, activeRef.current, restFrame)
    })
    return () => {
      cancelled = true
      animationRef.current?.destroy()
      animationRef.current = null
    }
  }, [animationData, restFrame])

  useEffect(() => {
    activeRef.current = active
    if (animationRef.current) sync(animationRef.current, active, restFrame)
  }, [active, restFrame])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        'pointer-events-none transition-[opacity,filter] duration-500',
        active ? 'opacity-100' : 'opacity-40 saturate-50',
        className
      )}
    />
  )
}

function sync(animation: AnimationItem, active: boolean, restFrame: number) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (active && !reducedMotion) animation.goToAndPlay(0, true)
  else animation.goToAndStop(restFrame, true)
}
