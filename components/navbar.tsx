'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { useState } from 'react'
import { CartSidebar } from './cart-sidebar'
import { SignInModal } from './sign-in-modal'

export function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount, toggleCart, toggleSignIn, user, signOut } = useStore()
  const cartCount = getCartCount()

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Borde decorativo andino */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-gold via-50% to-turquoise" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              {/* Logo inspirado en los Andes */}
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md">
                <img
                  src="/logotype.png"
                  alt="Hajsu logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-wide">
                  Hajsu
                </span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Textiles Andinos
                </span>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <div className="hidden items-center gap-8 lg:flex">
              <Link
                href="/"
                className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary"
              >
                Inicio
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                Catálogo
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                Nosotros
              </Link>
              {user && (
                <Link
                  href="/admin"
                  className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1">
              {/* Icono de usuario - Iniciar sesión o ir a Admin */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary"
                onClick={user ? () => router.push('/admin') : toggleSignIn}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">{user ? 'Cuenta' : 'Iniciar sesión'}</span>
              </Button>

              {/* Carrito */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-secondary"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>

              {/* Botón menú móvil */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-secondary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Menú</span>
              </Button>
            </div>
          </div>

          {/* Menú Móvil */}
          {isMenuOpen && (
            <div className="border-t border-border py-5 lg:hidden">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/products"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catálogo
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <div className="my-2 border-t border-border" />
                {user ? (
                  <>
                    <Link
                      href="/admin"
                      className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      toggleSignIn()
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar />
      <SignInModal />
    </>
  )
}
