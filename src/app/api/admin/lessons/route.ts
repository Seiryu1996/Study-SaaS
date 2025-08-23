import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth/admin'

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()
  } catch (error) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 403 }
    )
  }

  try {

    const body = await req.json()
    const { title, description, language, difficulty, exercises } = body

    // バリデーション
    if (!title || !description || !language || !difficulty || !exercises || exercises.length === 0) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    // レッスンを作成
    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        language,
        difficulty,
        isPublished: true,
        order: await getNextLessonOrder(),
        exercises: {
          create: exercises.map((exercise: any, index: number) => ({
            title: exercise.title,
            description: exercise.description,
            starterCode: exercise.starterCode,
            solution: exercise.solution,
            hints: exercise.hints.filter((hint: string) => hint.trim() !== ''),
            order: exercise.order || index + 1,
            testCases: {
              create: exercise.testCases
                .filter((testCase: any) => testCase.expectedOutput.trim() !== '')
                .map((testCase: any, testIndex: number) => ({
                  input: testCase.input || '',
                  expectedOutput: testCase.expectedOutput,
                  description: testCase.description || `テストケース ${testIndex + 1}`,
                  order: testIndex + 1
                }))
            }
          }))
        }
      },
      include: {
        exercises: {
          include: {
            testCases: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'レッスンが正常に作成されました',
      lesson
    })
  } catch (error) {
    console.error('レッスン作成エラー:', error)
    return NextResponse.json(
      { error: 'レッスンの作成中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

async function getNextLessonOrder(): Promise<number> {
  const lastLesson = await prisma.lesson.findFirst({
    orderBy: { order: 'desc' }
  })
  return (lastLesson?.order || 0) + 1
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin()
  } catch (error) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 403 }
    )
  }

  try {

    const lessons = await prisma.lesson.findMany({
      include: {
        exercises: {
          include: {
            testCases: true
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(lessons)
  } catch (error) {
    console.error('レッスン取得エラー:', error)
    return NextResponse.json(
      { error: 'レッスンの取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}