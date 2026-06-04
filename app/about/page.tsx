import { Metadata } from 'next'
import Image from 'next/image'
import { Heart, Leaf, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros | Hajsu Textiles Andinos',
  description: 'Conoce nuestra misión de preservar las tradiciones ancestrales del tejido andino mientras apoyamos a las comunidades artesanales.',
}

const values = [
  {
    icon: Heart,
    title: 'Alianza Artesanal',
    description: 'Trabajamos directamente con tejedores indígenas, asegurando una compensación justa y preservando técnicas tradicionales transmitidas por generaciones.',
    color: 'text-primary',
  },
  {
    icon: Leaf,
    title: 'Prácticas Sostenibles',
    description: 'Nuestros textiles usan tintes naturales de plantas y minerales locales, creando colores vibrantes mientras protegemos el medio ambiente.',
    color: 'text-forest',
  },
  {
    icon: Users,
    title: 'Impacto Comunitario',
    description: 'Cada compra apoya la educación, salud y desarrollo económico en comunidades remotas de los Andes.',
    color: 'text-turquoise',
  },
  {
    icon: Globe,
    title: 'Preservación Cultural',
    description: 'Documentamos y compartimos las historias detrás de cada patrón, manteniendo vivo el simbolismo andino ancestral para las futuras generaciones.',
    color: 'text-gold',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Sección Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-40 bg-gradient-to-l from-primary/8 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-32 bg-gradient-to-r from-gold/10 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-medium tracking-widest text-primary uppercase mb-4">
              Nuestra Historia
            </span>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Tejiendo Tradiciones,{' '}
              <span className="text-primary">Conectando Mundos</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Hajsu lleva las tradiciones textiles ancestrales de los Andes al mundo moderno, 
              conectando a maestros artesanos con personas que aprecian la artesanía auténtica 
              y el diseño con significado.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Misión */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src="/inicio2.jpg"
                alt="Tejedora andina creando textiles tradicionales"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <span className="text-sm font-medium tracking-widest text-turquoise uppercase">
                Nuestra Misión
              </span>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Preservando el Patrimonio a Través del Comercio Justo
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  En las tierras altas de Perú y Bolivia, generaciones de tejedores han creado 
                  textiles que cuentan historias de sus ancestros, su tierra y sus creencias. 
                  Cada patrón tiene significado, cada color representa el mundo natural que los rodea.
                </p>
                <p>
                  Hajsu fue fundada para asegurar que estas tradiciones continúen floreciendo. 
                  Nos asociamos directamente con cooperativas de artesanos, proporcionando salarios 
                  justos e ingresos sostenibles que permiten a los tejedores practicar su oficio 
                  mientras mantienen a sus familias.
                </p>
                <p>
                  Cuando eliges Hajsu, no solo estás comprando un textil. Te conviertes en parte 
                  de un movimiento para preservar el patrimonio cultural y apoyar a las comunidades indígenas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Valores */}
      <section className="py-16 sm:py-20 bg-secondary/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium tracking-widest text-gold uppercase">
              Lo Que Defendemos
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Nuestros Valores
            </h2>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div 
                key={value.title}
                className="bg-card border border-border p-6 space-y-4 transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className={`${value.color}`}>
                  <value.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-medium">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Artesanía */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 lg:order-2">
              <span className="text-sm font-medium tracking-widest text-fuchsia uppercase">
                La Artesanía
              </span>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Técnicas Ancestrales, Belleza Atemporal
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nuestros textiles son creados usando telares de cintura, una técnica que data 
                  de hace más de 4,000 años. Los maestros tejedores pasan semanas o incluso meses 
                  en una sola pieza, entrelazando cuidadosamente hilos para crear intrincados patrones geométricos.
                </p>
                <p>
                  Los colores provienen de fuentes naturales: los insectos de cochinilla producen rojos 
                  profundos, las plantas de índigo crean azules intensos, y los minerales locales proporcionan 
                  tonos terrosos. Estos tintes tradicionales crean colores que permanecen vibrantes por generaciones.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-primary">4,000+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Años de Tradición</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-turquoise">200+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Artesanos Aliados</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="font-serif text-3xl font-semibold text-gold">15</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Comunidades</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:order-1">
              <Image
                src="/inicio6.webp"
                alt="Patrones tradicionales de textiles andinos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Descubre Nuestra Colección
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Cada pieza en nuestro catálogo representa horas de artesanía experta y 
            siglos de conocimiento cultural. Encuentra tu conexión con los Andes.
          </p>
          <a 
            href="/products"
            className="mt-8 inline-flex items-center justify-center bg-background text-foreground px-8 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-background/90"
          >
            Ver Catálogo
          </a>
        </div>
      </section>
    </main>
  )
}
