import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function checkAdminAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    return { isAdmin: false, user: null }
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, isAdmin: true, email: true, name: true }
  })

  return {
    isAdmin: user?.isAdmin || false,
    user
  }
}

export async function requireAdmin() {
  const { isAdmin, user } = await checkAdminAuth()
  
  if (!isAdmin) {
    throw new Error('Admin access required')
  }
  
  return user
}