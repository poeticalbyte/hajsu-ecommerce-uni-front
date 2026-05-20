'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, LogIn, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'

export function SignInModal() {
  const router = useRouter()
  const { isSignInOpen, setSignInOpen, signIn } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = signIn(email, password)
    
    if (success) {
      setEmail('')
      setPassword('')
      router.push('/admin')
    } else {
      setError('Please enter a valid email and password (min 4 characters)')
    }
    
    setIsLoading(false)
  }

  if (!isSignInOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
        onClick={() => setSignInOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="bg-card border border-border shadow-2xl">
          {/* Header */}
          <div className="relative border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-primary/10">
                <LogIn className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Welcome Back</h2>
                <p className="text-sm text-muted-foreground">Sign in to access admin</p>
              </div>
            </div>
            <button
              onClick={() => setSignInOpen(false)}
              className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@qhawa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Enter any email and password (min 4 chars) to continue
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
