import { categories } from '@/lib/store'
import { ArrowRight, Laptop, Shirt, Sofa, Watch } from 'lucide-react'
import Link from 'next/link'

const categoryIcons: Record<string, React.ReactNode> = {
  Electronics: <Laptop className="h-8 w-8" />,
  Fashion: <Shirt className="h-8 w-8" />,
  Furniture: <Sofa className="h-8 w-8" />,
  Accessories: <Watch className="h-8 w-8" />,
}

const categoryImages: Record<string, string> = {
  Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
  Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
  Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
}

export function CategorySection() {
  return (
    <section className="bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse our popular categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={categoryImages[category]}
                  alt={category}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-background/20 backdrop-blur-sm text-white">
                  {categoryIcons[category]}
                </div>
                <h3 className="text-xl font-semibold text-white">{category}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-white/80 transition-all group-hover:text-white group-hover:gap-3">
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
