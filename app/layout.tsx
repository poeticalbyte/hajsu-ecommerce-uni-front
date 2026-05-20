import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-source-sans',
})

export const metadata: Metadata = {
  title: 'Qhawa | Authentic Andean Textiles & Traditional Clothing',
  description: 'Discover handcrafted Andean clothing and textiles. Authentic alpaca wool garments, traditional ponchos, and artisanal accessories from the heart of the Andes.',
  generator: 'v0.app',
  keywords: ['andean textiles', 'alpaca wool', 'traditional clothing', 'peruvian fashion', 'handwoven', 'artisanal', 'ponchos', 'indigenous crafts'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B4513',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
