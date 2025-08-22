import Link from 'next/link'

interface LessonCardProps {
  lesson: {
    id: string
    title: string
    description: string
    language: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    exerciseCount: number
  }
}

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const LANGUAGE_COLORS = {
  javascript: 'bg-yellow-500',
  typescript: 'bg-blue-500',
  python: 'bg-green-500',
  html: 'bg-orange-500',
  css: 'bg-blue-400',
  json: 'bg-gray-500',
  markdown: 'bg-purple-500'
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link href={`/lessons/${lesson.id}`}>
      <div className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-2">
            <span 
              className={`w-3 h-3 rounded-full ${LANGUAGE_COLORS[lesson.language as keyof typeof LANGUAGE_COLORS] || 'bg-gray-400'}`}
              title={lesson.language}
            />
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${DIFFICULTY_COLORS[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {lesson.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="capitalize">{lesson.language}</span>
          <span>{lesson.exerciseCount} exercises</span>
        </div>
      </div>
    </Link>
  )
}