import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany()

  const normalizedProducts = products.map((product) => ({
    id: product.id.toString(),
    name: product.name,
    price: Number(product.price),
    description: product.description ?? '',
    shortDescription: product.description?.slice(0, 120) ?? '',
    image: product.imageurl || '/logotype.png',
    images: [product.imageurl || '/logotype.png'],
    category: 'Artesanía',
    brand: 'Hajsu',
    rating: 4.8,
    reviews: 0,
    stock: product.stock ?? 0,
    tags: [],
    materials: product.materials ? [product.materials] : [],
    featured: false,
    isNew: false,
    discount: undefined,
    origin: '',
  }))

  return NextResponse.json(normalizedProducts)
}
