import { categories } from '@/lib/store'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const categoryImages: Record<string, string> = {
  Ponchos: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600',
  Sweaters: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
  Shawls: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
  Scarves: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600',
  Accessories: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600',
  Clothing: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=600',
  'Home Decor': 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600',
}

const categoryDescriptions: Record<string, string> = {
  Ponchos: 'Traditional warmth',
  Sweaters: 'Alpaca softness',
  Shawls: 'Woven heritage',
  Scarves: 'Luxurious fibers',
  Accessories: 'Artisan details',
  Clothing: 'Cultural elegance',
  'Home Decor': 'Andean artistry',
}

export function CategorySection() {
  const displayCategories = categories.slice(0, 6)
  
  return (
    <section className="bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
            Explore Our Collections
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            From traditional ponchos to contemporary alpaca knitwear, 
            each piece is handcrafted by skilled artisans
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category, index) => (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className={`group relative overflow-hidden ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/80 mb-1">
                  {categoryDescriptions[category]}
                </p>
                <h3 className="text-2xl font-semibold text-primary-foreground mb-2">
                  {category}
                </h3>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-all group-hover:text-primary-foreground group-hover:gap-3">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 transform rotate-45 translate-x-12 -translate-y-12" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
