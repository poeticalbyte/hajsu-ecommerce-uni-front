import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const orders = await prisma.orders.findMany({
    orderBy: { createdat: 'desc' },
    include: {
      customer: true,
      cartitem: true,
    },
  })

  const normalizedOrders = orders.map((order) => ({
    id: order.id.toString(),
    total: Number(order.total),
    status: order.status ?? 'PENDING',
    createdAt: order.createdat?.toISOString() ?? new Date().toISOString(),
    customer: {
      name: order.customer.fullname,
      email: order.customer.email,
      phone: order.customer.phone ?? '',
      address: order.customer.address ?? '',
      city: '',
      zipCode: '',
    },
    items: order.cartitem.map((item) => ({
      id: item.id.toString(),
      productid: item.productid.toString(),
      quantity: item.quantity,
      subtotal: Number(item.subtotal),
    })),
  }))

  return NextResponse.json(normalizedOrders)
}

interface OrderRequest {
  name: string
  email: string
  phone?: string
  address: string
  city: string
  zipCode: string
  cart: Array<{
    id: string
    quantity: number
    name?: string
    price?: number
    image?: string
    selectedSize?: string
    selectedColor?: string
  }>
}

export async function POST(request: Request) {
  let payload: OrderRequest

  try {
    payload = (await request.json()) as OrderRequest
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request payload' },
      { status: 400 }
    )
  }

  const { name, email, phone, address, city, zipCode, cart } = payload

  if (!name?.trim() || !email?.trim() || !address?.trim() || !city?.trim() || !zipCode?.trim() || !Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json(
      { error: 'Missing required order data' },
      { status: 400 }
    )
  }

  // Validate and normalize cart items
  const items = cart
    .map((item) => ({
      id: item.id,
      quantity: Number(item.quantity),
      name: item.name,
      price: item.price,
      image: item.image,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
    }))
    .filter((item) => item.id && item.quantity > 0)

  if (items.length === 0) {
    return NextResponse.json(
      { error: 'Cart must contain at least one valid item' },
      { status: 400 }
    )
  }

  try {
    // Ensure product ids are numeric strings (Prisma product.id is BigInt)
    for (const it of items) {
      if (!/^\d+$/.test(String(it.id))) {
        return NextResponse.json({ error: `Invalid product id: ${it.id}` }, { status: 400 })
      }
    }

    const order = await prisma.$transaction(async (tx) => {
      const existingCustomer = await tx.customer.findUnique({
        where: { email },
      })

      const customer =
        existingCustomer ??
        (await tx.customer.create({
          data: {
            fullname: name,
            email,
            phone: phone || null,
            address,
          },
        }))

      const productIds = items.map((item) => BigInt(item.id))
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      })

      if (products.length !== items.length) {
        throw new Error('Some products in the cart were not found')
      }

      const cartItems = items.map((item) => {
        const product = products.find(
          (product) => product.id === BigInt(item.id)
        )!
        const price = Number(product.price)
        const subtotal = Number((price * item.quantity).toFixed(2))

        return {
          productid: product.id,
          quantity: item.quantity,
          subtotal,
        }
      })

      const total = Number(
        cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0).toFixed(2)
      )

      const createdOrder = await tx.orders.create({
        data: {
          customerid: customer.id,
          total,
          status: 'PENDING',
          cartitem: {
            create: cartItems,
          },
        },
        include: {
          customer: true,
          cartitem: true,
        },
      })

      return createdOrder
    })

    const shapedOrder = {
      id: order.id.toString(),
      items: order.cartitem.map((item) => {
        const cartInfo = items.find((cartItem) => cartItem.id === item.productid.toString())
        const price = cartInfo?.price ?? Number(item.subtotal) / item.quantity
        return {
          id: item.id.toString(),
          productid: item.productid.toString(),
          quantity: item.quantity,
          subtotal: Number(item.subtotal),
          name: cartInfo?.name ?? '',
          price: Number(price),
          image: cartInfo?.image ?? '/logotype.png',
          selectedSize: cartInfo?.selectedSize,
          selectedColor: cartInfo?.selectedColor,
        }
      }),
      total: Number(order.total),
      status: order.status ?? 'PENDING',
      customer: {
        name,
        email,
        phone: phone || '',
        address,
        city,
        zipCode,
      },
      createdAt: order.createdat?.toISOString() ?? new Date().toISOString(),
    }

    return NextResponse.json({ order: shapedOrder })
  } catch (error) {
    // Log full error for debugging
    console.error('Order creation failed:', error instanceof Error ? error.message : error, error)
    const message = error instanceof Error ? error.message : 'Unable to create order. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
