import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getCurrentUser } from '@/lib/progress'
import Header from '@/components/layout/Header'
import DashboardStats from '@/components/dashboard/DashboardStats'
import LessonProgress from '@/components/dashboard/LessonProgress'
import RecentActivity from '@/components/dashboard/RecentActivity'

export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your learning progress and continue your coding journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats user={user} />
            <LessonProgress user={user} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <RecentActivity user={user} />
          </div>
        </div>
      </main>
    </div>
  )
}