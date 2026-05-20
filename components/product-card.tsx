'use client'

import { Star, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore, type Product } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart, setCartOpen } = useStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setCartOpen(true)
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute left-0 top-4 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-accent px-3 py-1 text-xs font-medium tracking-wide text-accent-foreground">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-primary px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground">
                New Arrival
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2 rounded-none"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="secondary" size="icon" className="shrink-0 rounded-none">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Origin */}
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider">
            <span>{product.category}</span>
            <span>{product.brand}</span>
          </div>

          {/* Name */}
          <h3 className="mb-2 font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Materials hint */}
          {variant === 'default' && product.materials && product.materials[0] && (
            <p className="mt-2 text-xs text-muted-foreground">
              {product.materials[0]}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
