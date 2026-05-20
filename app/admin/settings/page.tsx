'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Store,
  Mail,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Save,
} from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'NovaShop',
    storeEmail: 'support@novashop.com',
    storeUrl: 'https://novashop.com',
    currency: 'USD',
    taxRate: '8',
    shippingFree: '50',
    orderNotifications: true,
    stockAlerts: true,
  })

  const handleSave = () => {
    // In a real app, this would save to a database
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store settings and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Store Information */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Store Information</h2>
              <p className="text-sm text-muted-foreground">
                Basic information about your store
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Store Name</label>
              <Input
                value={settings.storeName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, storeName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Support Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      storeEmail: e.target.value,
                    }))
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Store URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="url"
                  value={settings.storeUrl}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, storeUrl: e.target.value }))
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Tax */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Payment & Tax</h2>
              <p className="text-sm text-muted-foreground">
                Configure payment and tax settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Currency</label>
              <Input
                value={settings.currency}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, currency: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Tax Rate (%)
              </label>
              <Input
                type="number"
                value={settings.taxRate}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, taxRate: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Free Shipping Threshold ($)
              </label>
              <Input
                type="number"
                value={settings.shippingFree}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    shippingFree: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Configure notification preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div>
                <p className="font-medium">Order Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for new orders
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.orderNotifications}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    orderNotifications: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded border-border"
              />
            </label>
            <label className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div>
                <p className="font-medium">Low Stock Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when products are running low
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.stockAlerts}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    stockAlerts: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded border-border"
              />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">
                Manage security settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Current Password
              </label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
