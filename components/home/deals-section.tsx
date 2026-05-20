'use client'

import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { ArrowRight, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DealsSection() {
  const { products } = useStore()
  const dealsProducts = products.filter((p) => p.discount).slice(0, 4)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
              <Zap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Flash Deals
              </h2>
              <p className="mt-1 text-muted-foreground">
                Limited time offers - don&apos;t miss out!
              </p>
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Ends in:</span>
            </div>
            <div className="flex gap-2">
              {[
                { value: '12', label: 'Hours' },
                { value: '34', label: 'Min' },
                { value: '56', label: 'Sec' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-lg bg-background px-3 py-2"
                >
                  <span className="text-xl font-bold tabular-nums">{item.value}</span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dealsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link href="/products?sort=deals">
              View All Deals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
