import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  image: string
  images: string[]
  category: string
  brand: string
  rating: number
  reviews: number
  stock: number
  tags: string[]
  sizes?: string[]
  colors?: string[]
  materials?: string[]
  featured?: boolean
  isNew?: boolean
  discount?: number
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
  }
  createdAt: string
}

interface StoreState {
  cart: CartItem[]
  orders: Order[]
  products: Product[]
  searchQuery: string
  selectedCategory: string
  priceRange: [number, number]
  selectedBrands: string[]
  sortBy: string
  isCartOpen: boolean
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  
  // Filter actions
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setPriceRange: (range: [number, number]) => void
  setSelectedBrands: (brands: string[]) => void
  setSortBy: (sort: string) => void
  
  // Order actions
  createOrder: (customer: Order['customer']) => Order
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  
  // Product actions
  addProduct: (product: Product) => void
  updateProduct: (productId: string, updates: Partial<Product>) => void
  deleteProduct: (productId: string) => void
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'Premium wireless headphones with industry-leading noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals who demand the best audio experience.',
    shortDescription: 'Premium wireless headphones with ANC',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
    ],
    category: 'Electronics',
    brand: 'SoundMax',
    rating: 4.8,
    reviews: 2341,
    stock: 50,
    tags: ['wireless', 'audio', 'noise-canceling'],
    colors: ['Black', 'White', 'Silver'],
    featured: true,
    discount: 25,
  },
  {
    id: '2',
    name: 'Smart Watch Pro Series',
    price: 449.99,
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Track your fitness goals and stay connected in style.',
    shortDescription: 'Advanced smartwatch with health monitoring',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
    ],
    category: 'Electronics',
    brand: 'TechWear',
    rating: 4.6,
    reviews: 1823,
    stock: 35,
    tags: ['smart', 'wearable', 'fitness'],
    colors: ['Black', 'Rose Gold', 'Silver'],
    featured: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Minimalist Leather Backpack',
    price: 189.99,
    originalPrice: 229.99,
    description: 'Handcrafted leather backpack with premium materials and thoughtful design. Features multiple compartments, laptop sleeve, and water-resistant coating.',
    shortDescription: 'Handcrafted premium leather backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    ],
    category: 'Fashion',
    brand: 'UrbanCarry',
    rating: 4.7,
    reviews: 892,
    stock: 25,
    tags: ['leather', 'backpack', 'travel'],
    colors: ['Brown', 'Black', 'Tan'],
    featured: true,
    discount: 17,
  },
  {
    id: '4',
    name: 'Ultra HD 4K Monitor 32"',
    price: 599.99,
    description: 'Professional-grade 32-inch 4K monitor with HDR support, 144Hz refresh rate, and color-accurate display perfect for creators and gamers.',
    shortDescription: 'Professional 32" 4K HDR monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    ],
    category: 'Electronics',
    brand: 'ViewPro',
    rating: 4.9,
    reviews: 567,
    stock: 15,
    tags: ['monitor', '4k', 'gaming'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    originalPrice: 549.99,
    description: 'Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort.',
    shortDescription: 'Premium ergonomic office chair',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800',
    ],
    category: 'Furniture',
    brand: 'ComfortZone',
    rating: 4.5,
    reviews: 1234,
    stock: 40,
    tags: ['office', 'ergonomic', 'chair'],
    colors: ['Black', 'Gray', 'Blue'],
    discount: 18,
  },
  {
    id: '6',
    name: 'Premium Running Shoes',
    price: 179.99,
    description: 'High-performance running shoes with responsive cushioning, breathable upper, and durable outsole. Engineered for speed and comfort.',
    shortDescription: 'High-performance running shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    ],
    category: 'Fashion',
    brand: 'SpeedRun',
    rating: 4.4,
    reviews: 2156,
    stock: 100,
    tags: ['shoes', 'running', 'sports'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Red/White', 'Black/Blue', 'Gray/Orange'],
    isNew: true,
  },
  {
    id: '7',
    name: 'Mechanical Gaming Keyboard',
    price: 159.99,
    originalPrice: 199.99,
    description: 'RGB mechanical keyboard with hot-swappable switches, aluminum frame, and customizable macros. Built for competitive gaming.',
    shortDescription: 'RGB mechanical gaming keyboard',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    ],
    category: 'Electronics',
    brand: 'KeyMaster',
    rating: 4.7,
    reviews: 3421,
    stock: 75,
    tags: ['keyboard', 'gaming', 'mechanical'],
    colors: ['Black', 'White'],
    discount: 20,
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 49.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.',
    shortDescription: 'Fast wireless charging pad',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=500',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800',
    ],
    category: 'Electronics',
    brand: 'ChargePro',
    rating: 4.3,
    reviews: 876,
    stock: 200,
    tags: ['charging', 'wireless', 'accessories'],
    colors: ['Black', 'White'],
  },
  {
    id: '9',
    name: 'Designer Sunglasses',
    price: 249.99,
    description: 'Premium polarized sunglasses with UV400 protection, titanium frame, and scratch-resistant lenses. Timeless style meets modern technology.',
    shortDescription: 'Premium polarized designer sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    ],
    category: 'Fashion',
    brand: 'VisionLux',
    rating: 4.6,
    reviews: 432,
    stock: 30,
    tags: ['sunglasses', 'fashion', 'accessories'],
    colors: ['Black', 'Tortoise', 'Gold'],
    featured: true,
  },
  {
    id: '10',
    name: 'Smart Home Speaker',
    price: 129.99,
    originalPrice: 159.99,
    description: 'Voice-controlled smart speaker with premium audio, smart home integration, and virtual assistant. Transform your home into a connected hub.',
    shortDescription: 'Voice-controlled smart home speaker',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500',
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800',
    ],
    category: 'Electronics',
    brand: 'HomeSmart',
    rating: 4.4,
    reviews: 1567,
    stock: 60,
    tags: ['speaker', 'smart-home', 'voice'],
    colors: ['Charcoal', 'Chalk', 'Coral'],
    discount: 19,
  },
  {
    id: '11',
    name: 'Professional Camera Drone',
    price: 899.99,
    description: 'Professional-grade drone with 4K camera, 45-minute flight time, obstacle avoidance, and intelligent flight modes. Capture stunning aerial footage.',
    shortDescription: 'Professional 4K camera drone',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
    ],
    category: 'Electronics',
    brand: 'SkyView',
    rating: 4.8,
    reviews: 234,
    stock: 12,
    tags: ['drone', 'camera', 'photography'],
    isNew: true,
  },
  {
    id: '12',
    name: 'Luxury Watch Collection',
    price: 1299.99,
    originalPrice: 1599.99,
    description: 'Swiss-made automatic watch with sapphire crystal, stainless steel case, and water resistance up to 100m. A timeless piece of craftsmanship.',
    shortDescription: 'Swiss-made luxury automatic watch',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    ],
    category: 'Fashion',
    brand: 'ChronoElite',
    rating: 4.9,
    reviews: 156,
    stock: 8,
    tags: ['watch', 'luxury', 'fashion'],
    colors: ['Silver', 'Gold', 'Rose Gold'],
    featured: true,
    discount: 19,
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      orders: [],
      products: mockProducts,
      searchQuery: '',
      selectedCategory: 'all',
      priceRange: [0, 2000],
      selectedBrands: [],
      sortBy: 'featured',
      isCartOpen: false,

      addToCart: (product, quantity = 1, size, color) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              { ...product, quantity, selectedSize: size, selectedColor: color },
            ],
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getCartCount: () => {
        const { cart } = get()
        return cart.reduce((count, item) => count + item.quantity, 0)
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      setCartOpen: (open) => set({ isCartOpen: open }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setPriceRange: (range) => set({ priceRange: range }),

      setSelectedBrands: (brands) => set({ selectedBrands: brands }),

      setSortBy: (sort) => set({ sortBy: sort }),

      createOrder: (customer) => {
        const { cart, getCartTotal } = get()
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items: [...cart],
          total: getCartTotal(),
          status: 'pending',
          customer,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          orders: [...state.orders, order],
          cart: [],
        }))

        return order
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }))
      },

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }))
      },

      updateProduct: (productId, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, ...updates } : product
          ),
        }))
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        }))
      },
    }),
    {
      name: 'novashop-storage',
      partialize: (state) => ({ cart: state.cart, orders: state.orders }),
    }
  )
)

// Helper functions
export const categories = ['Electronics', 'Fashion', 'Furniture', 'Accessories']
export const brands = ['SoundMax', 'TechWear', 'UrbanCarry', 'ViewPro', 'ComfortZone', 'SpeedRun', 'KeyMaster', 'ChargePro', 'VisionLux', 'HomeSmart', 'SkyView', 'ChronoElite']
