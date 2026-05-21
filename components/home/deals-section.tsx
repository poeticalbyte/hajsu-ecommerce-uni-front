'use client'

import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DealsSection() {
  const { products } = useStore()
  const dealsProducts = products.filter((p) => p.discount).slice(0, 4)

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-12 flex flex-col gap-6 border-l-4 border-accent bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* Símbolo del sol andino */}
            <div className="flex h-16 w-16 items-center justify-center bg-accent/20">
              <svg viewBox="0 0 48 48" className="h-10 w-10 text-accent" fill="currentColor">
                <circle cx="24" cy="24" r="10" />
                <path d="M24 2v8M24 38v8M2 24h8M38 24h8M7.5 7.5l5.5 5.5M35 35l5.5 5.5M7.5 40.5l5.5-5.5M35 13l5.5-5.5" 
                      stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-1">Oferta Limitada</p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Temporada Sagrada
              </h2>
              <p className="mt-2 text-muted-foreground">
                Celebra el Inti Raymi con precios especiales en piezas selectas
              </p>
            </div>
          </div>
          
          <Button variant="default" size="lg" className="rounded-none gap-2 self-start sm:self-auto" asChild>
            <Link href="/products?sort=deals">
              Ver Ofertas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid de productos */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dealsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
