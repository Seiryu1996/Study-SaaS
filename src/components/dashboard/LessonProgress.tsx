'use client'

import Link from 'next/link'

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
      language: string
      description: string
      exercises: Array<{
        id: string
      }>
    }
  }>
}

interface LessonProgressProps {
  user: User
}

export default function LessonProgress({ user }: LessonProgressProps) {
  const getLessonProgress = (lessonId: string, totalExercises: number) => {
    const completedCount = user.progress.filter(
      p => p.isCompleted && p.exercise.lesson.id === lessonId
    ).length
    
    return {
      completed: completedCount,
      total: totalExercises,
      percentage: totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
    }
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-100 text-yellow-800',
      python: 'bg-blue-100 text-blue-800',
      java: 'bg-red-100 text-red-800',
      cpp: 'bg-purple-100 text-purple-800',
      html: 'bg-orange-100 text-orange-800',
      css: 'bg-pink-100 text-pink-800'
    }
    return colors[language.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  if (user.enrollments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Lesson Progress</h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No lessons enrolled yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start your learning journey by enrolling in a lesson.
          </p>
          <Link
            href="/lessons"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Lessons
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Lesson Progress</h2>
      
      <div className="space-y-4">
        {user.enrollments.map((enrollment) => {
          const progress = getLessonProgress(
            enrollment.lesson.id,
            enrollment.lesson.exercises.length
          )
          
          return (
            <div 
              key={enrollment.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {enrollment.lesson.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getLanguageColor(enrollment.lesson.language)}`}>
                      {enrollment.lesson.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {enrollment.lesson.description}
                  </p>
                </div>
                <Link
                  href={`/lessons/${enrollment.lesson.id}`}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </Link>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {progress.completed} / {progress.total} exercises
                </span>
                <span className="text-sm text-gray-500">
                  {progress.percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    progress.percentage === 100 
                      ? 'bg-green-500' 
                      : progress.percentage > 0 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                  }`}
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}