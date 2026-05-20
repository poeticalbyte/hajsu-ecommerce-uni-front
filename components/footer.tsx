import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Decorative Andean border */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              {/* Andean logo */}
              <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
                <path d="M24 4L44 44H4L24 4Z" className="fill-primary" />
                <path d="M24 12L38 44H10L24 12Z" className="fill-accent" />
                <path d="M24 20L32 44H16L24 20Z" className="fill-background" />
                <circle cx="24" cy="16" r="4" className="fill-gold" />
              </svg>
              <div>
                <span className="text-2xl font-semibold tracking-wide">Qhawa</span>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">Andean Textiles</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Preserving ancient weaving traditions while supporting artisan communities 
              across the Andes. Every purchase directly benefits the families who create 
              these masterpieces.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Shop</h3>
            <ul className="space-y-3">
              {['All Products', 'Ponchos', 'Sweaters', 'Shawls', 'Accessories', 'New Arrivals'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'All Products' ? '/products' : `/products?category=${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">About</h3>
            <ul className="space-y-3">
              {['Our Story', 'Artisan Partners', 'Sustainability', 'Fair Trade', 'Care Guide', 'Press'].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Join Our Community</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for stories from the Andes, artisan spotlights, and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-secondary/50 border-border rounded-none"
              />
              <Button size="icon" className="shrink-0 rounded-none">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@qhawa.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Cusco, Peru & Brooklyn, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Qhawa Textiles. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Shipping & Returns
            </Link>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Fair Trade Certified
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
            </svg>
            Eco-Friendly Materials
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Artisan Made
          </span>
        </div>
      </div>
    </footer>
  )
}
