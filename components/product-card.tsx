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
      <div className="relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.discount && (
              <span className="rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                New
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="secondary" size="icon" className="shrink-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Brand */}
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{product.category}</span>
            <span>{product.brand}</span>
          </div>

          {/* Name */}
          <h3 className="mb-2 font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-warning text-warning'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {variant === 'default' && product.stock < 10 && product.stock > 0 && (
            <p className="mt-2 text-xs text-warning">
              Only {product.stock} left in stock
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
