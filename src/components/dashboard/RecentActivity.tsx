'use client'

interface User {
  id: string
  name: string | null
  email: string
  progress: Array<{
    id: string
    isCompleted: boolean
    attempts: number
    lastAttempt: Date
    completedAt?: Date | null
    exercise: {
      id: string
      title: string
      lesson: {
        id: string
        title: string
        language: string
      }
    }
  }>
}

interface RecentActivityProps {
  user: User
}

export default function RecentActivity({ user }: RecentActivityProps) {
  // Sort progress by most recent activity (lastAttempt or completedAt)
  const recentActivities = user.progress
    .map(progress => ({
      ...progress,
      activityDate: progress.completedAt || progress.lastAttempt
    }))
    .sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime())
    .slice(0, 10) // Show only last 10 activities

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    const now = new Date()
    const diffInMs = now.getTime() - d.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return d.toLocaleDateString()
    }
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200',
      python: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
      java: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
      cpp: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200',
      html: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200',
      css: 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200'
    }
    return colors[language.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
  }

  if (recentActivities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">⚡</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            No recent activity. Start coding to see your progress here!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Recent Activity</h2>
      
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              activity.isCompleted ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
            }`}>
              {activity.isCompleted ? '✅' : '💻'}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.exercise.title}
                </p>
                <span className={`px-1.5 py-0.5 text-xs rounded ${getLanguageColor(activity.exercise.lesson.language)}`}>
                  {activity.exercise.lesson.language}
                </span>
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                {activity.exercise.lesson.title}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.isCompleted ? 'Completed' : `${activity.attempts} attempt${activity.attempts !== 1 ? 's' : ''}`}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(activity.activityDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {user.progress.length > 10 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            View All Activity
          </button>
        </div>
      )}
    </div>
  )
}