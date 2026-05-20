import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ArtisanStorySection() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
                    alt="Andean weaver at work"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-4xl font-semibold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground mt-1">Years of Tradition</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=500"
                    alt="Traditional textiles"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
                    alt="Colorful Andean patterns"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 border-4 border-accent/30" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
              Our Heritage
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6 text-balance">
              Preserving Ancient Weaving Traditions
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For over five centuries, the master weavers of the Andes have passed down 
                their intricate techniques from generation to generation. Each thread tells 
                a story of mountains, sky, and the sacred connection between earth and cosmos.
              </p>
              <p>
                At Qhawa, we partner directly with artisan communities in Peru and Bolivia, 
                ensuring fair wages and preserving these invaluable traditions. When you 
                purchase a piece from us, you&apos;re not just buying clothing — you&apos;re 
                supporting families and keeping an ancient art form alive.
              </p>
              <p>
                Our textiles are crafted from the finest alpaca and vicuña fibers, naturally 
                dyed using cochineal, indigo, and traditional plant extracts that have colored 
                Andean garments since the time of the Incas.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none gap-2" asChild>
                <Link href="/products">
                  Meet Our Artisans
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-none border-2" asChild>
                <Link href="/products">
                  Shop Collection
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-semibold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Partner Communities</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Fair Trade</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Synthetic Dyes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
