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
        stock: Math.max(0, Number(stock) ?? 0),
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      name,
      description,
      price,
      image,
      stock,
      tags,
      materials,
    } = body

    if (!id || !/^\d+$/.test(String(id))) {
      return NextResponse.json({ message: 'Invalid product id' }, { status: 400 })
    }

    const updatedProduct = await prisma.product.update({
      where: { id: BigInt(id) },
      data: {
        name: name || 'Untitled',
        description: description ?? '',
        price: Number(price) ?? 0,
        imageurl: image || '',
        materials: materials ?? (Array.isArray(tags) ? tags.join(', ') : ''),
        stock: Math.max(0, Number(stock) ?? 0),
      },
    })

    const normalized = {
      id: updatedProduct.id.toString(),
      name: updatedProduct.name,
      price: Number(updatedProduct.price),
      description: updatedProduct.description ?? '',
      shortDescription: updatedProduct.description?.slice(0, 120) ?? '',
      image: updatedProduct.imageurl || '/logotype.png',
      images: [updatedProduct.imageurl || '/logotype.png'],
      category: 'Artesanía',
      brand: 'Hajsu',
      rating: 4.8,
      reviews: 0,
      stock: updatedProduct.stock ?? 0,
      tags: updatedProduct.materials ? updatedProduct.materials.split(',').map((t) => t.trim()).filter(Boolean) : [],
      materials: updatedProduct.materials ? [updatedProduct.materials] : [],
      featured: false,
      isNew: false,
      discount: undefined,
      origin: '',
    }

    return NextResponse.json(normalized)
  } catch (error) {
    console.error('PATCH /api/products error', error)
    return NextResponse.json({ message: 'Failed to update product' }, { status: 500 })
  }
}
