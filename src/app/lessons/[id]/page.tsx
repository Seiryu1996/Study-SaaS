import LessonContent from '@/components/lessons/LessonContent'
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

async function getLesson(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          testCases: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    }
  })

  if (!lesson || !lesson.isPublished) {
    return null
  }

  return lesson
}

export default async function LessonDetailPage({
  params
}: {
  params: { id: string }
}) {
  const lesson = await getLesson(params.id)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LessonContent lesson={lesson} />
    </div>
  )
}