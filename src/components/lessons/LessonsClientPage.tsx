'use client'

import { useState, useMemo, useEffect } from 'react'
import LessonCard from '@/components/lessons/LessonCard'
import Header from '@/components/layout/Header'
import { useTranslation } from '@/lib/i18n'

interface Lesson {
  id: string
  title: string
  description: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exerciseCount: number
}

interface LessonsClientPageProps {
  lessons: Lesson[]
}

const SUPPORTED_LANGUAGES = [
  { code: 'javascript', name: 'JavaScript', displayName: 'JavaScript' },
  { code: 'python', name: 'Python', displayName: 'Python' },
  { code: 'html', name: 'HTML', displayName: 'HTML' },
  { code: 'css', name: 'CSS', displayName: 'CSS' },
  { code: 'typescript', name: 'TypeScript', displayName: 'TypeScript' },
  { code: 'csharp', name: 'C#', displayName: 'C#' },
  { code: 'go', name: 'Go', displayName: 'Go' },
  { code: 'ruby', name: 'Ruby', displayName: 'Ruby' },
  { code: 'php', name: 'PHP', displayName: 'PHP' }
]

const DIFFICULTY_LEVELS = [
  { code: 'beginner', name: 'Beginner', displayName: '初級' },
  { code: 'intermediate', name: 'Intermediate', displayName: '中級' },
  { code: 'advanced', name: 'Advanced', displayName: '上級' }
]

export default function LessonsClientPage({ lessons }: LessonsClientPageProps) {
  const { t } = useTranslation()
  
  // Get unique languages from lessons and set first available as default
  const availableLanguages = useMemo(() => {
    const languagesInLessons = new Set(lessons.map(lesson => lesson.language))
    return SUPPORTED_LANGUAGES.filter(lang => languagesInLessons.has(lang.code))
  }, [lessons])
  
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner')
  
  // Set initial language when available languages are loaded
  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLanguage) {
      setSelectedLanguage(availableLanguages[0].code)
    }
  }, [availableLanguages, selectedLanguage])

  // Filter lessons based on selected criteria
  const filteredLessons = useMemo(() => {
    if (!selectedLanguage) return []
    
    return lessons.filter(lesson => {
      const languageMatch = lesson.language === selectedLanguage
      const difficultyMatch = lesson.difficulty === selectedDifficulty
      return languageMatch && difficultyMatch
    })
  }, [lessons, selectedLanguage, selectedDifficulty])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('lessons.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('lessons.description')}
          </p>
        </div>

        {/* Language Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">プログラミング言語</h2>
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedLanguage === language.code
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {language.displayName}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">難易度</h2>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_LEVELS.map((level) => (
              <button
                key={level.code}
                onClick={() => setSelectedDifficulty(level.code)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDifficulty === level.code
                    ? 'bg-green-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {level.displayName}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredLessons.length}個のレッスンが見つかりました
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {availableLanguages.find(l => l.code === selectedLanguage)?.displayName}
            </span>
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              {DIFFICULTY_LEVELS.find(l => l.code === selectedDifficulty)?.displayName}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              該当するレッスンが見つかりませんでした
            </h3>
            <p className="text-gray-500 mb-4">
              フィルター条件を変更して再度お試しください
            </p>
            <button
              onClick={() => {
                setSelectedLanguage(availableLanguages.length > 0 ? availableLanguages[0].code : 'javascript')
                setSelectedDifficulty('beginner')
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('lessons.moreComing')}
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            {t('lessons.requestLesson')}
          </button>
        </div>
      </div>
    </div>
  )
}