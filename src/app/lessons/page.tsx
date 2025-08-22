import LessonCard from '@/components/lessons/LessonCard'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/db'
import LessonsClientPage from '@/components/lessons/LessonsClientPage'

async function getLessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        isPublished: true
      },
      include: {
        exercises: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    return lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      language: lesson.language,
      difficulty: lesson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
      exerciseCount: lesson.exercises.length
    }))
  } catch (error) {
    console.error('Failed to fetch lessons:', error)
    return []
  }
}

export default async function LessonsPage() {
  const lessons = await getLessons()
  
  return <LessonsClientPage lessons={lessons} />
}