'use client'

import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FeaturedProducts() {
  const { products } = useStore()
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
              Artisan Selection
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured Pieces
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Our most treasured textiles, each one carrying centuries of tradition 
              and the skilled hands of master weavers
            </p>
          </div>
          <Button variant="outline" className="rounded-none border-2 gap-2 self-start sm:self-auto" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
