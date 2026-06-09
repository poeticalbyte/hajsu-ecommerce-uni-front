import { PrismaClient } from '@/lib/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL ?? ''

export const prisma =
  globalThis.prisma ?? new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}