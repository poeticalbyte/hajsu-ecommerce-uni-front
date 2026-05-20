'use client'

import { useStore } from '@/lib/store'
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { products, orders, getCartTotal } = useStore()

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCustomers = new Set(orders.map((o) => o.customer.email)).size

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      label: 'Total Products',
      value: totalProducts.toString(),
      change: '+2',
      trend: 'up',
      icon: Package,
    },
    {
      label: 'Customers',
      value: totalCustomers.toString(),
      change: '+5.1%',
      trend: 'up',
      icon: Users,
    },
  ]

  // Recent orders
  const recentOrders = orders.slice(-5).reverse()

  // Top products (by stock, simulating sales)
  const topProducts = [...products]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}
              >
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShoppingCart className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg bg-secondary p-4"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.status === 'delivered'
                          ? 'bg-success/20 text-success'
                          : order.status === 'shipped'
                          ? 'bg-primary/20 text-primary'
                          : order.status === 'cancelled'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Link
              href="/admin/products"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-medium">
                  {index + 1}
                </span>
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.reviews.toLocaleString()} reviews
                  </p>
                </div>
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-4 rounded-xl bg-card p-6 transition-colors hover:bg-card/80"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Add Product</p>
            <p className="text-sm text-muted-foreground">Create a new product</p>
          </div>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-4 rounded-xl bg-card p-6 transition-colors hover:bg-card/80"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">View Orders</p>
            <p className="text-sm text-muted-foreground">Manage customer orders</p>
          </div>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 rounded-xl bg-card p-6 transition-colors hover:bg-card/80"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">View Store</p>
            <p className="text-sm text-muted-foreground">See your live storefront</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
