import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // 認証チェック（オプション - レッスン一覧は認証不要でも良い）
    // const { userId } = auth()
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

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

    const lessonsData = lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      language: lesson.language,
      difficulty: lesson.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
      exerciseCount: lesson.exercises.length
    }))

    return NextResponse.json(lessonsData)
  } catch (error) {
    console.error('Failed to fetch lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}