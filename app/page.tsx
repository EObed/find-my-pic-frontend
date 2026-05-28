'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import {Moon, Sun, Upload, Sparkles, Users, Download, Camera, LockKeyhole, FileStack} from 'lucide-react'
import {useRouter} from "next/navigation";

export default function Page() {
  const [mounted, setMounted] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card transition-colors duration-300">
        <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ImageFinder
              </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
                  How It Works
                </a>
                {/*<a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">*/}
                {/*  Pricing*/}
                {/*</a>*/}
              </div>

              <div className="flex items-center gap-4">
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
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
                <Button onClick={handleGetStarted} className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-shadow">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Event Photos
                </span>
                  {' '}Instantly
                </h1>
                <p className="text-lg sm:text-xl text-foreground/60 max-w-xl">
                  Upload your image and let our AI find professional photos of you from any event. Fast, accurate, and magical.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-shadow">
                  Upload Your Photo
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>Results in seconds</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <Upload className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Powerful Features</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Everything you need to find and download your event photos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
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
              ].map((feature, i) => (
                  <Card key={i} className="p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 border border-border">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Three simple steps to find your photos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Upload Your Photo',
                  description: 'Take a clear selfie or photo and upload it to our platform. Any photo of yourself works.',
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: 'Our advanced AI analyzes your appearance, facial features, and clothing for accurate matching.',
                },
                {
                  step: '03',
                  title: 'Download & Share',
                  description: 'Get your matched photos instantly and download them in high resolution.',
                },
              ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-4 top-0 text-5xl font-bold text-primary/10 dark:text-white/50">{item.step}</div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold relative z-10">{item.title}</h3>
                      <p className="text-foreground/60">{item.description}</p>
                    </div>

                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {/*<section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">*/}
        {/*  <div className="space-y-12">*/}
        {/*    <div className="text-center space-y-4">*/}
        {/*      <h2 className="text-3xl sm:text-4xl font-bold">Simple Pricing</h2>*/}
        {/*      <p className="text-lg text-foreground/60 max-w-2xl mx-auto">*/}
        {/*        Choose the plan that works for you*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
        {/*      {[*/}
        {/*        {*/}
        {/*          name: 'Starter',*/}
        {/*          price: 'Free',*/}
        {/*          description: 'Perfect to get started',*/}
        {/*          features: ['5 uploads per month', 'Basic matching', 'Standard quality'],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          name: 'Professional',*/}
        {/*          price: 'GH₵5',*/}
        {/*          period: '/month',*/}
        {/*          description: 'For regular users',*/}
        {/*          features: ['Unlimited uploads', 'Advanced matching', 'High quality downloads', 'Priority support'],*/}
        {/*          popular: true,*/}
        {/*        },*/}
        {/*        {*/}
        {/*          name: 'Studio',*/}
        {/*          price: 'GH₵20',*/}
        {/*          period: '/month',*/}
        {/*          description: 'For photographers',*/}
        {/*          features: ['Unlimited uploads', 'Gallery management', '4K downloads', 'Team collaboration'],*/}
        {/*        },*/}
        {/*      ].map((plan, i) => (*/}
        {/*          <Card*/}
        {/*              key={i}*/}
        {/*              className={`p-8 relative transition-all duration-300 ${*/}
        {/*                  plan.popular*/}
        {/*                      ? 'border-2 border-primary/50 shadow-xl'*/}
        {/*                      : 'border border-border'*/}
        {/*              }`}*/}
        {/*          >*/}
        {/*            {plan.popular && (*/}
        {/*                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-semibold text-primary-foreground">*/}
        {/*                  Most Popular*/}
        {/*                </div>*/}
        {/*            )}*/}
        {/*            <div className="space-y-4">*/}
        {/*              <div>*/}
        {/*                <h3 className="text-xl font-semibold">{plan.name}</h3>*/}
        {/*                <p className="text-foreground/60 text-sm">{plan.description}</p>*/}
        {/*              </div>*/}

        {/*              <div className="space-y-1">*/}
        {/*                <span className="text-4xl font-bold">{plan.price}</span>*/}
        {/*                {plan.period && <span className="text-foreground/60 text-sm">{plan.period}</span>}*/}
        {/*              </div>*/}

        {/*              <Button*/}
        {/*                  className={`w-full ${*/}
        {/*                      plan.popular*/}
        {/*                          ? 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50'*/}
        {/*                          : ''*/}
        {/*                  }`}*/}
        {/*                  variant={plan.popular ? 'default' : 'outline'}*/}
        {/*              >*/}
        {/*                Get Started*/}
        {/*              </Button>*/}

        {/*              <div className="space-y-3 pt-4 border-t border-border">*/}
        {/*                {plan.features.map((feature, j) => (*/}
        {/*                    <div key={j} className="flex items-center gap-3 text-sm">*/}
        {/*                      <div className="w-2 h-2 rounded-full bg-primary" />*/}
        {/*                      <span className="text-foreground/70">{feature}</span>*/}
        {/*                    </div>*/}
        {/*                ))}*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </Card>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Find Your Photos?</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join thousands of users who are discovering their event photos instantly
            </p>
            <Button onClick={handleGetStarted} size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50">
              Start Matching Now
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold">ImageFinder</span>
                </div>
                <p className="text-foreground/60 text-sm">Find your event photos with AI</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Product</h4>
                <div className="text-sm text-foreground/60">
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                  {/*<a href="#" className="hover:text-foreground transition-colors block">*/}
                  {/*  Pricing*/}
                  {/*</a>*/}
                  <a href="#" className="hover:text-foreground transition-colors block">
                    Security
                  </a>
                </div>
              </div>
              {/*<div className="space-y-4">*/}
              {/*  <h4 className="font-semibold">Company</h4>*/}
              {/*  <div className=" text-sm text-foreground/60">*/}
              {/*    <a href="#" className="hover:text-foreground transition-colors">*/}
              {/*      About*/}
              {/*    </a>*/}
              {/*    <a href="#" className="hover:text-foreground transition-colors block">*/}
              {/*      Blog*/}
              {/*    </a>*/}
              {/*    <a href="#" className="hover:text-foreground transition-colors block">*/}
              {/*      Contact*/}
              {/*    </a>*/}
              {/*  </div>*/}
              {/*</div>*/}
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

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
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
