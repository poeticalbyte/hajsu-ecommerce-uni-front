'use client'

import { ArrowRight, Mountain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle Andean pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            currentColor 0px,
            currentColor 2px,
            transparent 2px,
            transparent 20px
          )`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-none border-l-4 border-primary bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground">
              <Mountain className="h-4 w-4 text-primary" />
              <span className="tracking-wide">Handcrafted in the Andes</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight">
              Authentic{' '}
              <span className="text-primary">
                Andean Textiles
              </span>{' '}
              Woven with Tradition
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Each piece tells a story passed down through generations. 
              Discover handwoven alpaca garments, traditional ponchos, and 
              artisanal accessories crafted by master weavers from Peru and Bolivia.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 rounded-none" asChild>
                <Link href="/products">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-none border-2" asChild>
                <Link href="/products?category=ponchos">
                  Shop Ponchos
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-semibold sm:text-3xl text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Handcrafted</p>
              </div>
              <div>
                <p className="text-2xl font-semibold sm:text-3xl text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Artisan Partners</p>
              </div>
              <div>
                <p className="text-2xl font-semibold sm:text-3xl text-primary">Fair</p>
                <p className="text-sm text-muted-foreground">Trade Certified</p>
              </div>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Main large image */}
              <div className="col-span-7 row-span-2">
                <div className="aspect-[3/4] overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600"
                    alt="Traditional Andean poncho"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Smaller images */}
              <div className="col-span-5 space-y-4">
                <div className="aspect-square overflow-hidden border-4 border-accent/20">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"
                    alt="Colorful woven textiles"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=400"
                    alt="Traditional aguayo fabric"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -left-4 bottom-12 rounded-none bg-card p-5 shadow-lg border-l-4 border-accent sm:-left-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center bg-accent/20">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L4 9v12h16V9l-8-6z" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Direct from Artisans</p>
                  <p className="text-sm text-muted-foreground">Supporting local communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />
    </section>
  )
}
