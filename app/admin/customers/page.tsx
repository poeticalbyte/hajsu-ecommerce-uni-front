'use client'

import { useStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Search, Mail, MapPin, ShoppingBag, Users } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function AdminCustomersPage() {
  const { orders } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique customers from orders
  const customers = useMemo(() => {
    const customerMap = new Map()
    orders.forEach((order) => {
      const email = order.customer.email
      if (customerMap.has(email)) {
        const existing = customerMap.get(email)
        existing.totalOrders += 1
        existing.totalSpent += order.total
        existing.lastOrder = order.createdAt
      } else {
        customerMap.set(email, {
          ...order.customer,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrder: order.createdAt,
        })
      }
    })
    return Array.from(customerMap.values())
  }, [orders])

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer base ({customers.length} customers)
        </p>
      </div>

      {/* Filters */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-medium">No customers yet</p>
          <p className="text-sm text-muted-foreground">
            Customers will appear here after they make their first purchase.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.email}
              className="rounded-xl bg-card p-6 space-y-4"
            >
              {/* Customer Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-medium text-primary-foreground">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{customer.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-xl font-bold">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold">${customer.totalSpent.toFixed(2)}</p>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.city}, {customer.zipCode}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Last order: {formatDate(customer.lastOrder)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
