import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      {/* Borde decorativo andino */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-gold via-50% to-turquoise" />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              {/* Logo andino */}
              <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
                <path d="M24 4L44 44H4L24 4Z" className="fill-primary" />
                <path d="M24 12L38 44H10L24 12Z" className="fill-turquoise" />
                <path d="M24 20L32 44H16L24 20Z" className="fill-background" />
                <circle cx="24" cy="16" r="4" className="fill-gold" />
              </svg>
              <div>
                <span className="text-xl font-semibold tracking-wide">Hajsu</span>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">Textiles Andinos</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Preservando tradiciones ancestrales de tejido mientras apoyamos a las comunidades 
              artesanales de los Andes.
            </p>
            <div className="flex gap-2">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center bg-background border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center bg-background border border-border text-muted-foreground transition-colors hover:bg-fuchsia hover:text-fuchsia-foreground hover:border-fuchsia"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-turquoise" />
                <span>+51 984 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-gold" />
                <span>hola@hajsu.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-fuchsia" />
                <span>Cusco, Perú</span>
              </div>
            </div>
          </div>

          {/* Boletín */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-turquoise">Boletín</h3>
            <p className="text-sm text-muted-foreground">
              Historias de los Andes y ofertas exclusivas.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu correo"
                className="bg-background border-border"
              />
              <Button size="icon" className="shrink-0">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Suscribirse</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Parte inferior */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hajsu Textiles. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Comercio Justo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-turquoise" />
              Ecológico
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Hecho a Mano
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
