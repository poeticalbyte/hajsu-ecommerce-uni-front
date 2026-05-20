import { Metadata } from 'next'
import Image from 'next/image'
import { Heart, Leaf, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Qhawa Andean Textiles',
  description: 'Learn about our mission to preserve ancient Andean weaving traditions while supporting artisan communities.',
}

const values = [
  {
    icon: Heart,
    title: 'Artisan Partnership',
    description: 'We work directly with indigenous weavers, ensuring fair compensation and preserving traditional techniques passed down through generations.',
    color: 'text-primary',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description: 'Our textiles use natural dyes from local plants and minerals, creating vibrant colors while protecting the environment.',
    color: 'text-forest',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Every purchase supports education, healthcare, and economic development in remote Andean villages.',
    color: 'text-turquoise',
  },
  {
    icon: Globe,
    title: 'Cultural Preservation',
    description: 'We document and share the stories behind each pattern, keeping ancient Andean symbolism alive for future generations.',
    color: 'text-gold',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-40 bg-gradient-to-l from-primary/8 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-32 bg-gradient-to-r from-gold/10 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4">
              Our Story
            </span>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Weaving Traditions,{' '}
              <span className="text-primary">Connecting Worlds</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Qhawa brings the ancient textile traditions of the Andes to the modern world, 
              connecting master artisans with people who appreciate authentic craftsmanship 
              and meaningful design.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1600&auto=format&fit=crop"
                alt="Andean weaver creating traditional textiles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <span className="text-sm font-medium tracking-widest text-turquoise uppercase">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Preserving Heritage Through Fair Trade
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In the highlands of Peru and Bolivia, generations of weavers have created 
                  textiles that tell stories of their ancestors, their land, and their beliefs. 
                  Each pattern carries meaning, each color represents the natural world around them.
                </p>
                <p>
                  Qhawa was founded to ensure these traditions continue to thrive. We partner 
                  directly with artisan cooperatives, providing fair wages and sustainable 
                  income that allows weavers to practice their craft while supporting their families.
                </p>
                <p>
                  When you choose Qhawa, you are not just buying a textile. You are becoming 
                  part of a movement to preserve cultural heritage and support indigenous communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-secondary/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium tracking-widest text-gold uppercase">
              What We Stand For
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Our Values
            </h2>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div 
                key={value.title}
                className="bg-card border border-border p-6 space-y-4 transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className={`${value.color}`}>
                  <value.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-medium">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Section */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 lg:order-2">
              <span className="text-sm font-medium tracking-widest text-fuchsia uppercase">
                The Craft
              </span>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Ancient Techniques, Timeless Beauty
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our textiles are created using backstrap looms, a technique that dates back 
                  over 4,000 years. Master weavers spend weeks or even months on a single piece, 
                  carefully interlacing threads to create intricate geometric patterns.
                </p>
                <p>
                  The colors come from natural sources: cochineal insects produce deep reds, 
                  indigo plants create rich blues, and local minerals provide earthy tones. 
                  These traditional dyes create colors that remain vibrant for generations.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-primary">4,000+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Years of Tradition</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-turquoise">200+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Artisan Partners</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-gold">15</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Communities</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1600&auto=format&fit=crop"
                alt="Traditional Andean textile patterns"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Discover Our Collection
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Each piece in our catalogue represents hours of skilled craftsmanship and 
            centuries of cultural knowledge. Find your connection to the Andes.
          </p>
          <a 
            href="/products"
            className="mt-8 inline-flex items-center justify-center bg-background text-foreground px-8 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-background/90"
          >
            Browse Catalogue
          </a>
        </div>
      </section>
    </main>
  )
}
