'use client'

import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'

export function CartSidebar() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, getCartTotal } = useStore()
  const total = getCartTotal()

  if (!isCartOpen) return null

  return (
    <>
      {/* Fondo */}
      <div
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Panel lateral */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Borde superior decorativo */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
        
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-wide">Tu Carrito</h2>
            <span className="bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {cart.length}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} className="hover:bg-secondary">
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar carrito</span>
          </Button>
        </div>

        {/* Artículos del carrito */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="flex h-24 w-24 items-center justify-center border-2 border-dashed border-border">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-lg">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Descubre nuestros textiles andinos artesanales
                </p>
              </div>
              <Button onClick={() => setCartOpen(false)} className="rounded-none" asChild>
                <Link href="/products">Explorar Colección</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 border-b border-border pb-4"
                >
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium line-clamp-2">
                          {item.name}
                        </h3>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.selectedColor} {item.selectedSize && `/ ${item.selectedSize}`}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Disminuir cantidad</span>
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie del carrito */}
        {cart.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-primary">{total >= 150 ? 'Gratis' : '$15.00'}</span>
              </div>
              {total < 150 && (
                <p className="text-xs text-muted-foreground">
                  Agrega ${(150 - total).toFixed(2)} más para envío gratis
                </p>
              )}
              <div className="flex items-center justify-between border-t border-border pt-3 text-lg font-semibold">
                <span>Total</span>
                <span>${(total >= 150 ? total : total + 15).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild size="lg" className="w-full rounded-none" onClick={() => setCartOpen(false)}>
                <Link href="/checkout">Proceder al Pago</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-none"
                onClick={() => setCartOpen(false)}
                asChild
              >
                <Link href="/cart">Ver Carrito Completo</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
