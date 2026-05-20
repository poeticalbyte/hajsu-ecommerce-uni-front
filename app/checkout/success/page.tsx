'use client'

import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2,
  Package,
  Mail,
  ArrowRight,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order') || 'ORD-XXXXXXX'

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success/20">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Order Confirmed!
          </h1>
          <p className="mb-8 text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>

          {/* Order Info Card */}
          <div className="mb-8 w-full rounded-xl bg-card p-6">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-medium">Order Number</span>
            </div>
            <p className="mb-6 text-2xl font-bold tracking-wider">{orderId}</p>

            {/* Order Status */}
            <div className="relative mb-6">
              <div className="absolute left-0 top-4 h-1 w-full bg-secondary">
                <div className="h-full w-1/4 bg-primary transition-all duration-500" />
              </div>
              <div className="relative flex justify-between">
                {[
                  { label: 'Confirmed', active: true },
                  { label: 'Processing', active: false },
                  { label: 'Shipped', active: false },
                  { label: 'Delivered', active: false },
                ].map((step, index) => (
                  <div key={step.label} className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        step.active
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background'
                      }`}
                    >
                      {step.active ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs ${
                        step.active ? 'font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Notice */}
            <div className="flex items-center justify-center gap-2 rounded-lg bg-secondary p-4 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                A confirmation email has been sent to your inbox
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <p className="mt-8 text-sm text-muted-foreground">
            Questions about your order?{' '}
            <Link href="#" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 animate-pulse rounded-full bg-secondary" />
            <div className="mt-6 h-8 w-48 animate-pulse rounded bg-secondary" />
            <div className="mt-4 h-4 w-64 animate-pulse rounded bg-secondary" />
          </div>
        </div>
        <Footer />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
