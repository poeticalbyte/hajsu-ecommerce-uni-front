'use client'

import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FeaturedProducts() {
  const { products } = useStore()
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked selections for you
            </p>
          </div>
          <Button variant="ghost" className="gap-2 self-start sm:self-auto" asChild>
            <Link href="/products?sort=featured">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
