'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>New Collection 2026</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Discover{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Premium Products
              </span>{' '}
              for Modern Living
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Explore our curated collection of high-quality electronics, fashion, 
              and accessories. Free shipping on orders over $50.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products?category=new">
                  View New Arrivals
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-bold sm:text-3xl">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold sm:text-3xl">10K+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold sm:text-3xl">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
                    alt="Headphones"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                    alt="Watch"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
                    alt="Backpack"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                    alt="Shoes"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -left-8 bottom-24 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                  <Sparkles className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Flash Sale</p>
                  <p className="text-sm text-muted-foreground">Up to 50% off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
