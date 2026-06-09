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
    status: (order.status ?? 'PENDING').toString().toLowerCase(),
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

      // Ensure sufficient stock for each requested item
      for (const it of items) {
        const product = products.find((p) => p.id === BigInt(it.id))
        if (!product) throw new Error(`Product not found: ${it.id}`)
        const stock = product.stock ?? 0
        if (stock < it.quantity) {
          throw new Error(`Insufficient stock for product ${product.name || it.id}. Available: ${stock}, requested: ${it.quantity}`)
        }
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

      // Decrement stock for each product
      for (const ci of cartItems) {
        const prod = products.find((p) => p.id === ci.productid)
        if (prod) {
          const newStock = (prod.stock ?? 0) - ci.quantity
          await tx.product.update({ where: { id: prod.id }, data: { stock: newStock } })
        }
      }

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

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!orderId || !/^\d+$/.test(String(orderId))) {
      return NextResponse.json({ error: 'Invalid order id' }, { status: 400 })
    }
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid order status' }, { status: 400 })
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: BigInt(orderId) },
      data: { status: status.toUpperCase() },
      include: { customer: true, cartitem: true },
    })

    const normalized = {
      id: updatedOrder.id.toString(),
      total: Number(updatedOrder.total),
      status: (updatedOrder.status ?? 'PENDING').toString().toLowerCase(),
      createdAt: updatedOrder.createdat?.toISOString() ?? new Date().toISOString(),
      customer: {
        name: updatedOrder.customer.fullname,
        email: updatedOrder.customer.email,
        phone: updatedOrder.customer.phone ?? '',
        address: updatedOrder.customer.address ?? '',
        city: '',
        zipCode: '',
      },
      items: updatedOrder.cartitem.map((item) => ({
        id: item.id.toString(),
        productid: item.productid.toString(),
        quantity: item.quantity,
        subtotal: Number(item.subtotal),
      })),
    }

    return NextResponse.json({ order: normalized })
  } catch (error) {
    console.error('PATCH /api/orders error', error)
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }
}
