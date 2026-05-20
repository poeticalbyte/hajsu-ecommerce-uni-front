'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Menu, X, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import { useState } from 'react'
import { CartSidebar } from './cart-sidebar'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getCartCount, toggleCart, searchQuery, setSearchQuery } = useStore()
  const cartCount = getCartCount()

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Decorative Andean pattern border - more colorful */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-gold via-50% to-turquoise" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              {/* Andean-inspired logo mark */}
              <div className="relative flex h-12 w-12 items-center justify-center">
                <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                  {/* Stepped pyramid / mountain shape */}
                  <path 
                    d="M24 4L44 44H4L24 4Z" 
                    className="fill-primary"
                  />
                  <path 
                    d="M24 12L38 44H10L24 12Z" 
                    className="fill-turquoise"
                  />
                  <path 
                    d="M24 20L32 44H16L24 20Z" 
                    className="fill-background"
                  />
                  {/* Sun circle */}
                  <circle cx="24" cy="16" r="4" className="fill-gold" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold tracking-wide">
                  Qhawa
                </span>
                <span className="text-xs tracking-widest text-muted-foreground uppercase">
                  Andean Textiles
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-10 lg:flex">
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
              <button
                onClick={toggleCart}
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </button>
              <Link
                href="/admin"
                className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                Admin
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden flex-1 max-w-sm lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search textiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-secondary/50 border-border focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-secondary"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Admin */}
              <Link href="/admin" className="hidden sm:flex">
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Admin</span>
                </Button>
              </Link>

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

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="border-t border-border py-3 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search textiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-secondary/50 border-border"
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="border-t border-border py-6 lg:hidden">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Catalogue
                </Link>
                <button
                  onClick={() => {
                    toggleCart()
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Cart {cartCount > 0 && `(${cartCount})`}
                </button>
                <div className="my-2 border-t border-border" />
                <Link
                  href="/admin"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar />
    </>
  )
}
