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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      description,
      price,
      image,
      stock,
      tags,
      materials,
    } = body

    const created = await prisma.product.create({
      data: {
        name: name || 'Untitled',
        description: description ?? '',
        price: Number(price) ?? 0,
        imageurl: image || '',
        materials: materials ?? (Array.isArray(tags) ? tags.join(', ') : ''),
        stock: Number(stock) ?? 0,
      },
    })

    const normalized = {
      id: created.id.toString(),
      name: created.name,
      price: Number(created.price),
      description: created.description ?? '',
      shortDescription: created.description?.slice(0, 120) ?? '',
      image: created.imageurl || '/logotype.png',
      images: [created.imageurl || '/logotype.png'],
      category: 'Artesanía',
      brand: 'Hajsu',
      rating: 4.8,
      reviews: 0,
      stock: created.stock ?? 0,
      tags: created.materials ? created.materials.split(',').map((t) => t.trim()).filter(Boolean) : [],
      materials: created.materials ? [created.materials] : [],
      featured: false,
      isNew: false,
      discount: undefined,
      origin: '',
    }

    return NextResponse.json(normalized, { status: 201 })
  } catch (error) {
    console.error('POST /api/products error', error)
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 })
  }
}
