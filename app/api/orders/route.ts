import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
      items: order.cartitem.map((item) => ({
        ...item,
        id: item.id.toString(),
        productid: item.productid.toString(),
        subtotal: Number(item.subtotal),
        name: items.find((cartItem) => cartItem.id === item.productid.toString())?.name ?? '',
        price:
          Number(items.find((cartItem) => cartItem.id === item.productid.toString())?.price) ||
          Number(item.subtotal) / item.quantity,
        image:
          items.find((cartItem) => cartItem.id === item.productid.toString())?.image ||
          '/logotype.png',
        selectedSize:
          items.find((cartItem) => cartItem.id === item.productid.toString())?.selectedSize,
        selectedColor:
          items.find((cartItem) => cartItem.id === item.productid.toString())?.selectedColor,
      })),
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
    console.error('Order creation failed:', error)
    return NextResponse.json(
      { error: 'Unable to create order. Please try again.' },
      { status: 500 }
    )
  }
}
