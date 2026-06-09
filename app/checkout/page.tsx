'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShoppingBag,
  Check,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart, addOrder, loadProducts } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const total = getCartTotal()
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Invalid card number'
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)

    setErrors({})

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}`,
          city: formData.city,
          zipCode: formData.zipCode,
          cart: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
            image: item.image,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      const result = await response.json().catch(() => ({ error: 'Invalid server response' }))

      if (!response.ok) {
        throw new Error(result.error || `Failed to create order (status ${response.status})`)
      }

      addOrder(result.order)
      clearCart()
      await loadProducts().catch((loadError) => {
        console.warn('Failed to refresh products after order:', loadError)
      })
      router.push(`/checkout/success?order=${result.order.id}`)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server:
          error instanceof Error
            ? error.message
            : 'Something went wrong while placing your order.',
      }))
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Add some products before checking out.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Checkout Form */}
          <div>
            <h1 className="mb-6 text-2xl font-bold tracking-tight">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.server && (
                <div className="rounded-xl border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
                  {errors.server}
                </div>
              )}
              {/* Contact Information */}
              <div className="rounded-xl bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-xl bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Street Address
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-destructive">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-destructive">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      ZIP Code
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className={errors.zipCode ? 'border-destructive' : ''}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-xs text-destructive">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-xl bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Payment</h2>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Secure Payment
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`pl-10 ${errors.cardNumber ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Expiry Date
                      </label>
                      <Input
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? 'border-destructive' : ''}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-xs text-destructive">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        CVV
                      </label>
                      <Input
                        name="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className={errors.cvv ? 'border-destructive' : ''}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-destructive">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-xl bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

              {/* Items */}
              <div className="max-h-64 space-y-4 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.name}
                      </p>
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor} {item.selectedSize && `/ ${item.selectedSize}`}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
                <Lock className="h-4 w-4" />
                Your payment information is encrypted and secure
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
