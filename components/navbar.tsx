'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, LogIn, LogOut, User } from 'lucide-react'
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

  const handleAdminClick = () => {
    if (user) {
      router.push('/admin')
    } else {
      toggleSignIn()
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Decorative Andean pattern border */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-gold via-50% to-turquoise" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              {/* Andean-inspired logo mark */}
              <div className="relative flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
                  <path d="M24 4L44 44H4L24 4Z" className="fill-primary" />
                  <path d="M24 12L38 44H10L24 12Z" className="fill-turquoise" />
                  <path d="M24 20L32 44H16L24 20Z" className="fill-background" />
                  <circle cx="24" cy="16" r="4" className="fill-gold" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-wide">
                  Qhawa
                </span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Andean Textiles
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              <Link
                href="/"
                className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                Catalogue
              </Link>
              {user ? (
                <Link
                  href="/admin"
                  className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
                >
                  Admin
                </Link>
              ) : (
                <button
                  onClick={toggleSignIn}
                  className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* User/Sign In */}
              {user ? (
                <div className="hidden sm:flex items-center gap-1">
                  <Link href="/admin">
                    <Button variant="ghost" size="icon" className="hover:bg-secondary">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Admin</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-secondary"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex hover:bg-secondary"
                  onClick={toggleSignIn}
                >
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              )}

              {/* Cart */}
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
                <span className="sr-only">Cart</span>
              </Button>

              {/* Mobile Menu Toggle */}
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
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="border-t border-border py-5 lg:hidden">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catalogue
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
                      Sign Out
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
                    Sign In
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
