import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Auto-seed database if no lessons exist
async function checkAndSeed() {
  try {
    const lessonCount = await prisma.lesson.count()
    if (lessonCount === 0) {
      console.log('No lessons found. Running seed...')
      await import('../../../prisma/complete-seed')
      console.log('Seed completed!')
    }
  } catch (error) {
    console.error('Failed to check/seed database:', error)
  }
}

// Run seed check in development
if (process.env.NODE_ENV !== 'production') {
  checkAndSeed()
}