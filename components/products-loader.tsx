'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'

export function ProductsLoader() {
  const { productsLoaded, setProducts, setProductsLoaded } = useStore()

  useEffect(() => {
    if (productsLoaded) {
      return
    }

    let mounted = true

    fetch('/api/products')
      .then(async (response) => {
        if (!response.ok) {
          const message = await response.text()
          throw new Error(message || 'Failed to load products')
        }
        return response.json()
      })
      .then((data) => {
        if (!mounted) {
          return
        }
        setProducts(data)
        setProductsLoaded(true)
      })
      .catch((error) => {
        console.error('ProductsLoader error:', error)
        if (mounted) {
          setProductsLoaded(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [productsLoaded, setProducts, setProductsLoaded])

  return null
}
