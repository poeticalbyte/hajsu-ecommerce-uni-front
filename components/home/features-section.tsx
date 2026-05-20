import { Truck, Shield, Heart, Users } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Artisan Partners',
    description: 'Supporting 50+ weaving communities',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
  {
    icon: Heart,
    title: 'Fair Trade',
    description: 'Ethically sourced & fairly paid',
    color: 'text-fuchsia',
    bgColor: 'bg-fuchsia/10',
    borderColor: 'border-fuchsia/30',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'Free delivery on orders over $150',
    color: 'text-turquoise',
    bgColor: 'bg-turquoise/10',
    borderColor: 'border-turquoise/30',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Certificate of origin included',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/30',
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-gradient-to-r from-card via-background to-card py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 group"
            >
              <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center border-2 ${feature.borderColor} ${feature.bgColor} ${feature.color} transition-all group-hover:scale-105`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`font-semibold tracking-wide ${feature.color}`}>{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
