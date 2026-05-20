import { Truck, Shield, Heart, Users } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Artisan Partners',
    description: 'Supporting 50+ weaving communities',
  },
  {
    icon: Heart,
    title: 'Fair Trade',
    description: 'Ethically sourced & fairly paid',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'Free delivery on orders over $150',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Certificate of origin included',
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-primary/20 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold tracking-wide">{feature.title}</h3>
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
