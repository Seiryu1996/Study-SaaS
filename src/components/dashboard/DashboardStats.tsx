'use client'

interface User {
  id: string
  name: string | null
  email: string
  progress: Array<{
    id: string
    isCompleted: boolean
    exercise: {
      id: string
      title: string
      lesson: {
        id: string
        title: string
      }
    }
  }>
  enrollments: Array<{
    id: string
    lesson: {
      id: string
      title: string
      exercises: Array<{
        id: string
      }>
    }
  }>
}

interface DashboardStatsProps {
  user: User
}

export default function DashboardStats({ user }: DashboardStatsProps) {
  const totalLessons = user.enrollments.length
  const completedExercises = user.progress.filter(p => p.isCompleted).length
  const totalExercises = user.enrollments.reduce(
    (acc, enrollment) => acc + enrollment.lesson.exercises.length,
    0
  )
  const progressPercentage = totalExercises > 0 
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0

  const stats = [
    {
      title: 'Enrolled Lessons',
      value: totalLessons,
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      title: 'Completed Exercises',
      value: completedExercises,
      icon: '✅',
      color: 'bg-green-500'
    },
    {
      title: 'Total Exercises',
      value: totalExercises,
      icon: '📝',
      color: 'bg-purple-500'
    },
    {
      title: 'Progress',
      value: `${progressPercentage}%`,
      icon: '📊',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Learning Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {totalExercises > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm text-gray-500">
              {completedExercises} / {totalExercises}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}