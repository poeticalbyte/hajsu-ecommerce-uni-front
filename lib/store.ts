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
  origin?: string
  artisan?: string
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

export interface User {
  email: string
  name: string
  isAdmin: boolean
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
  isSignInOpen: boolean
  user: User | null
  productsLoaded: boolean
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  
  // Product actions
  setProducts: (products: Product[]) => void
  setProductsLoaded: (loaded: boolean) => void
  
  // Auth actions
  toggleSignIn: () => void
  setSignInOpen: (open: boolean) => void
  signIn: (email: string, password: string) => boolean
  signOut: () => void
  
  // Filter actions
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setPriceRange: (range: [number, number]) => void
  setSelectedBrands: (brands: string[]) => void
  setSortBy: (sort: string) => void
  
  // Order actions
  createOrder: (customer: Order['customer']) => Order
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  setOrders: (orders: Order[]) => void
  loadOrders: () => Promise<void>
  loadProducts: () => Promise<void>
  
  // Product actions
  addProduct: (product: Product) => void
  updateProduct: (productId: string, updates: Partial<Product>) => void
  deleteProduct: (productId: string) => void
}

// Andean traditional clothing products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Chaleco Chagral Estación Lunar',
    price: 389.99,
    originalPrice: 459.99,
    description: 'Exquisite handwoven poncho crafted from the finest baby alpaca wool. This masterpiece features traditional Inca geometric patterns in rich earth tones, passed down through generations of skilled artisans from the Sacred Valley. The intricate diamond and step motifs symbolize the Andean cosmos and mountain peaks.',
    shortDescription: 'Handwoven baby alpaca poncho with Inca patterns',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Estacion-Lunar-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Estacion-Lunar-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Estacion-Lunar-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Estacion-Lunar-300x300.jpg',
    ],
    category: 'Ponchos',
    brand: 'Qhawa Artisans',
    rating: 4.9,
    reviews: 234,
    stock: 15,
    tags: ['alpaca', 'handwoven', 'traditional', 'poncho'],
    colors: ['Terracotta', 'Earth Brown', 'Natural Cream'],
    sizes: ['S/M', 'L/XL'],
    materials: ['100% Baby Alpaca Wool'],
    featured: true,
    discount: 15,
    origin: 'Cusco, Peru',
    artisan: 'Comunidad de Chinchero',
  },
  {
    id: '2',
    name: 'Chaleco Chagral Pastos',
    price: 279.99,
    description: 'Elegant cardigan featuring the sacred Chakana (Andean Cross), a powerful symbol representing the connection between the earthly and celestial worlds. Hand-knitted with alpaca blend yarn using traditional techniques. Perfect for layering.',
    shortDescription: 'Alpaca cardigan with sacred Chakana motif',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Pastos-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Pastos-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-Pastos-300x300.jpg',
    ],
    category: 'Sweaters',
    brand: 'Inti Raymi',
    rating: 4.7,
    reviews: 156,
    stock: 28,
    tags: ['alpaca', 'cardigan', 'chakana', 'traditional'],
    colors: ['Indigo', 'Burgundy', 'Forest Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['70% Alpaca, 30% Merino Wool'],
    featured: true,
    isNew: true,
    origin: 'Arequipa, Peru',
    artisan: 'Colectivo Textil Arequipa',
  },
  {
    id: '3',
    name: 'Chaleco Vestido Fuego',
    price: 189.99,
    originalPrice: 229.99,
    description: 'Traditional Bolivian aguayo shawl featuring vibrant stripes and geometric patterns in authentic Andean colors. Each piece is hand-loomed using ancient techniques, taking weeks to complete. The vibrant palette represents the diversity of Andean landscapes.',
    shortDescription: 'Traditional hand-loomed Bolivian aguayo',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Vestido-Fuego-1-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Vestido-Fuego-1-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Vestido-Fuego-1-300x300.jpg',
    ],
    category: 'Shawls',
    brand: 'Pachamama Textiles',
    rating: 4.8,
    reviews: 312,
    stock: 22,
    tags: ['aguayo', 'shawl', 'bolivian', 'handwoven'],
    colors: ['Multi-color Traditional', 'Earth Tones', 'Sunset Palette'],
    materials: ['100% Andean Sheep Wool'],
    featured: true,
    discount: 17,
    origin: 'La Paz, Bolivia',
    artisan: 'Mujeres Tejedoras de El Alto',
  },
  {
    id: '4',
    name: 'Accesorios',
    price: 69.99,
    description: 'Iconic Peruvian chullo hat with traditional earflaps and decorative tassels. Each hat is hand-knitted with colorful geometric patterns that tell stories of Andean mythology. Lined with soft fleece for extra warmth.',
    shortDescription: 'Traditional Peruvian knitted earflap hat',
    image: 'https://tse3.mm.bing.net/th/id/OIP.Ua6wDPxcbXvAP6_Nz4dVaAHaEj?r=0&pid=ImgDet&w=474&h=291&rs=1&o=7&rm=3',
    images: [
      'https://tse3.mm.bing.net/th/id/OIP.Ua6wDPxcbXvAP6_Nz4dVaAHaEj?r=0&pid=ImgDet&w=474&h=291&rs=1&o=7&rm=3',
    ],
    category: 'Accessories',
    brand: 'Qhawa Artisans',
    rating: 4.6,
    reviews: 487,
    stock: 65,
    tags: ['chullo', 'hat', 'peruvian', 'winter'],
    colors: ['Rainbow', 'Earth Tones', 'Red/Orange', 'Blue/Turquoise'],
    sizes: ['Child', 'Adult S/M', 'Adult L/XL'],
    materials: ['100% Alpaca Wool', 'Fleece Lining'],
    isNew: true,
    origin: 'Puno, Peru',
    artisan: 'Artesanos del Lago Titicaca',
  },
  {
    id: '5',
    name: 'Capa Magistral Pachamama',
    price: 449.99,
    description: 'Luxurious scarf crafted from rare vicuña and baby alpaca blend. The vicuña, sacred to the Incas, produces the finest and rarest fiber in the world. This exceptional piece features subtle geometric patterns woven with extraordinary softness.',
    shortDescription: 'Ultra-luxurious vicuña blend scarf',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Capa-Magistral-Pachamama-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Capa-Magistral-Pachamama-300x300.jpg',
    ],
    category: 'Scarves',
    brand: 'Inti Raymi',
    rating: 5.0,
    reviews: 47,
    stock: 8,
    tags: ['vicuña', 'luxury', 'scarf', 'rare'],
    colors: ['Natural Camel', 'Charcoal', 'Ivory'],
    materials: ['30% Vicuña, 70% Baby Alpaca'],
    featured: true,
    origin: 'Cusco, Peru',
    artisan: 'Master Weaver Don Julio',
  },
  {
    id: '6',
    name: 'Manto Vestido Chagral',
    price: 329.99,
    originalPrice: 399.99,
    description: 'Magnificent ceremonial lliclla traditionally worn by Andean women for festivals and important occasions. This intricate piece features ancestral symbols representing fertility, protection, and abundance. Hand-dyed using natural cochineal and plant extracts.',
    shortDescription: 'Traditional ceremonial carrying cloth',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Manto-Vestido-Chagral1-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Manto-Vestido-Chagral1-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Manto-Vestido-Chagral2-300x300.jpg',
    ],
    category: 'Shawls',
    brand: 'Pachamama Textiles',
    rating: 4.9,
    reviews: 89,
    stock: 12,
    tags: ['lliclla', 'ceremonial', 'natural-dye', 'traditional'],
    colors: ['Cochineal Red', 'Indigo Blue', 'Natural with Gold'],
    materials: ['Hand-spun Alpaca, Natural Dyes'],
    discount: 18,
    origin: 'Ayacucho, Peru',
    artisan: 'Asociación de Tejedoras de Quinua',
  },
  {
    id: '7',
    name: 'Capa Fuego Verde el Canto del Colibrí',
    price: 249.99,
    description: 'Classic cable knit sweater crafted from premium alpaca wool. The timeless design blends traditional Andean craftsmanship with contemporary style. Incredibly soft, hypoallergenic, and warmer than sheep wool.',
    shortDescription: 'Premium alpaca cable knit pullover',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Capa-Fuego-Verde-el-Canto-del-Colibri-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Capa-Fuego-Verde-el-Canto-del-Colibri-300x300.jpg',
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Capa-Fuego-Verde-el-Canto-del-Colibri-300x300.jpg',
    ],
    category: 'Sweaters',
    brand: 'Qhawa Artisans',
    rating: 4.7,
    reviews: 203,
    stock: 35,
    tags: ['alpaca', 'sweater', 'cable-knit', 'classic'],
    colors: ['Oatmeal', 'Charcoal', 'Burgundy', 'Forest'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: ['100% Royal Alpaca'],
    origin: 'Arequipa, Peru',
    artisan: 'Cooperativa Alpaquera del Sur',
  },
  {
    id: '8',
    name: 'Woven Belt - Chumpi',
    price: 79.99,
    description: 'Traditional Andean woven belt (chumpi) featuring complex geometric patterns. Each belt requires hours of meticulous hand-weaving using a backstrap loom. The patterns carry deep symbolic meaning related to community and identity.',
    shortDescription: 'Traditional backstrap-loomed Andean belt',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    category: 'Accessories',
    brand: 'Pachamama Textiles',
    rating: 4.5,
    reviews: 156,
    stock: 48,
    tags: ['chumpi', 'belt', 'woven', 'backstrap-loom'],
    colors: ['Red Multi', 'Blue Multi', 'Earth Tones'],
    sizes: ['S (28-32")', 'M (32-36")', 'L (36-40")'],
    materials: ['Handspun Sheep Wool'],
    origin: 'Cusco, Peru',
    artisan: 'Comunidad de Pitumarca',
  },
  {
    id: '9',
    name: 'Alpaca Fingerless Gloves',
    price: 59.99,
    description: 'Cozy fingerless gloves hand-knitted from soft alpaca wool. Perfect for maintaining dexterity while keeping hands warm. Features traditional Andean colorwork and comfortable ribbed cuffs.',
    shortDescription: 'Hand-knitted alpaca fingerless mittens',
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=500',
    images: [
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800',
    ],
    category: 'Accessories',
    brand: 'Inti Raymi',
    rating: 4.6,
    reviews: 234,
    stock: 72,
    tags: ['gloves', 'alpaca', 'fingerless', 'handknit'],
    colors: ['Gray/White', 'Brown/Cream', 'Multi-color'],
    sizes: ['S/M', 'L/XL'],
    materials: ['100% Alpaca Wool'],
    isNew: true,
    origin: 'Puno, Peru',
    artisan: 'Tejedoras de la Isla Taquile',
  },
  {
    id: '10',
    name: 'Pañolón Mama con Simbología',
    price: 189.99,
    originalPrice: 219.99,
    description: 'Beautiful traditional blouse featuring intricate hand embroidery inspired by Andean flora. Each flower and vine is carefully stitched using vibrant thread colors. The embroidery style reflects the unique artistic traditions of Ayacucho.',
    shortDescription: 'Hand-embroidered traditional Andean blouse',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Panolon-Mama-con-Simbologia1-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Panolon-Mama-con-Simbologia1-300x300.jpg',
    ],
    category: 'Clothing',
    brand: 'Qhawa Artisans',
    rating: 4.8,
    reviews: 98,
    stock: 18,
    tags: ['embroidered', 'blouse', 'traditional', 'pollera'],
    colors: ['White with Multi', 'Cream with Earth', 'Black with Bright'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: ['100% Cotton, Hand Embroidery'],
    discount: 14,
    origin: 'Ayacucho, Peru',
    artisan: 'Bordadoras de Huamanga',
  },
  {
    id: '11',
    name: 'tradicional',
    price: 299.99,
    description: 'Stunning handwoven tapestry depicting traditional Andean scenes and mythology. Created using ancient weaving techniques on traditional looms. Perfect as statement wall art that brings Andean culture into your home.',
    shortDescription: 'Handwoven decorative Andean tapestry',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500',
    images: [
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
    ],
    category: 'Home Decor',
    brand: 'Pachamama Textiles',
    rating: 4.9,
    reviews: 67,
    stock: 9,
    tags: ['tapestry', 'wall-art', 'woven', 'decor'],
    colors: ['Traditional Earth', 'Mountain Scene', 'Cosmic Design'],
    materials: ['Hand-spun Wool, Natural & Synthetic Dyes'],
    featured: true,
    origin: 'San Pedro de Cajas, Peru',
    artisan: 'Master Weaver Familia Quispe',
  },
  {
    id: '12',
    name: 'Chaleco Chagral',
    price: 199.99,
    description: 'Versatile reversible vest offering two looks in one garment. One side features bold geometric patterns while the reverse showcases a solid complementary color. Crafted from soft alpaca blend for all-season comfort.',
    shortDescription: 'Two-in-one reversible alpaca vest',
    image: 'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-300x300.jpg',
    images: [
      'https://www.hajsu.com.co/wp-content/uploads/2023/07/Chaleco-Chagral-300x300.jpg',
    ],
    category: 'Clothing',
    brand: 'Inti Raymi',
    rating: 4.6,
    reviews: 143,
    stock: 25,
    tags: ['vest', 'reversible', 'alpaca', 'versatile'],
    colors: ['Rust/Cream', 'Navy/Gray', 'Burgundy/Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['80% Alpaca, 20% Nylon'],
    isNew: true,
    origin: 'Lima, Peru',
    artisan: 'Colectivo Moda Andina',
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
      // Increase default max price to accommodate high-priced products
      priceRange: [0, 1000000],
      selectedBrands: [],
      sortBy: 'featured',
      isCartOpen: false,
      isSignInOpen: false,
      productsLoaded: false,
      user: null,

      addToCart: (product, quantity = 1, size, color) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          )

          const availableStock = typeof product.stock === 'number' ? product.stock : 0

          if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + quantity, availableStock)
            if (newQuantity === existingItem.quantity) {
              // already at max stock
              console.warn(`Cannot add more of product ${product.id}, reached stock limit`)
              return { cart: state.cart }
            }

            return {
              cart: state.cart.map((item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          }

          const quantityToAdd = Math.min(quantity, availableStock)
          if (quantityToAdd <= 0) {
            console.warn(`Product ${product.id} has no stock available`) 
            return { cart: state.cart }
          }

          return {
            cart: [
              ...state.cart,
              { ...product, quantity: quantityToAdd, selectedSize: size, selectedColor: color },
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
          cart: state.cart.map((item) => {
            if (item.id !== productId) return item
            const max = typeof item.stock === 'number' ? item.stock : item.quantity
            const safeQty = Math.max(0, Math.min(quantity, max))
            if (safeQty !== quantity) console.warn(`Adjusted quantity for ${productId} to available stock ${max}`)
            return { ...item, quantity: safeQty }
          }),
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

      toggleSignIn: () => set((state) => ({ isSignInOpen: !state.isSignInOpen })),
      
      setSignInOpen: (open) => set({ isSignInOpen: open }),
      
      signIn: (email, password) => {
        // Simple auth - in production, this would be a proper auth system
        if (email && password.length >= 4) {
          set({
            user: {
              email,
              name: email.split('@')[0],
              isAdmin: true,
            },
            isSignInOpen: false,
          })
          return true
        }
        return false
      },
      
      signOut: () => set({ user: null }),

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

      updateOrderStatus: async (orderId, status) => {
        try {
          const response = await fetch('/api/orders', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, status }),
          })

          if (!response.ok) {
            const text = await response.text()
            throw new Error(text || 'Failed to update order status')
          }

          const result = await response.json()
          if (result?.order) {
            const updatedOrder = result.order
            set((state) => ({
              orders: state.orders.map((order) =>
                order.id === updatedOrder.id
                  ? { ...order, status: updatedOrder.status }
                  : order
              ),
            }))
          }
        } catch (error) {
          console.error('updateOrderStatus failed:', error)
        }
      },

      addOrder: (order) => {
        set((state) => ({ orders: [...state.orders, order] }))
      },

      setOrders: (orders) => set({ orders }),

      loadOrders: async () => {
        try {
          const response = await fetch('/api/orders')

          if (!response.ok) {
            const message = await response.text()
            throw new Error(message || 'Failed to load orders')
          }

          const orders = (await response.json()) as Order[]
          if (Array.isArray(orders)) {
            set({ orders })
          }
        } catch (error) {
          console.error('loadOrders error:', error)
        }
      },

        loadProducts: async () => {
              try {
                console.info('loadProducts: fetching /api/products')
                const response = await fetch('/api/products')
                if (!response.ok) {
                  const message = await response.text()
                  throw new Error(message || 'Failed to load products')
                }

                const products = await response.json()
                console.info('loadProducts: fetched', Array.isArray(products) ? products.length : 0, 'products')
                if (Array.isArray(products)) {
                  // Adjust priceRange max to include the highest product price
                  try {
                    const maxPrice = products.reduce((max: number, p: any) => {
                      const priceNum = Number(p.price) || 0
                      return Math.max(max, priceNum)
                    }, 0)
                    const currentMin = get().priceRange?.[0] ?? 0
                    const newMax = Math.max(2000, Math.ceil(maxPrice))
                    set({ products, productsLoaded: true, priceRange: [currentMin, newMax] })
                  } catch (e) {
                    set({ products, productsLoaded: true })
                  }
                } else {
                  console.warn('loadProducts: response is not an array', products)
                }
              } catch (error) {
                console.error('loadProducts error:', error)
                // mark as loaded to avoid infinite retry loops
                set({ productsLoaded: true })
              }
        },

      setProducts: (products) => set({ products }),

      setProductsLoaded: (loaded) => set({ productsLoaded: loaded }),

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
      name: 'qhawa-storage',
      // Persist only the cart locally; orders should come from the database.
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)

// Categories for Andean textiles
export const categories = ['Ponchos', 'Sweaters', 'Shawls', 'Scarves', 'Accessories', 'Clothing', 'Home Decor']
export const brands = ['Qhawa Artisans', 'Inti Raymi', 'Pachamama Textiles']
