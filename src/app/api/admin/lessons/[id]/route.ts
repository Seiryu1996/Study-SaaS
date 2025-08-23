import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth/admin'

// レッスン詳細取得
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
  } catch (error) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 403 }
    )
  }

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.id },
      include: {
        exercises: {
          include: {
            testCases: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'レッスンが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('レッスン取得エラー:', error)
    return NextResponse.json(
      { error: 'レッスンの取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// レッスン更新
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!title || !description || !language || !difficulty) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    // トランザクションで更新
    const updatedLesson = await prisma.$transaction(async (tx) => {
      // 既存のエクササイズとテストケースを削除
      await tx.exercise.deleteMany({
        where: { lessonId: params.id }
      })

      // レッスンを更新
      return await tx.lesson.update({
        where: { id: params.id },
        data: {
          title,
          description,
          language,
          difficulty,
          exercises: {
            create: exercises?.map((exercise: any, index: number) => ({
              title: exercise.title,
              description: exercise.description,
              starterCode: exercise.starterCode,
              solution: exercise.solution,
              hints: exercise.hints?.filter((hint: string) => hint.trim() !== '') || [],
              order: exercise.order || index + 1,
              testCases: {
                create: exercise.testCases
                  ?.filter((testCase: any) => testCase.expectedOutput?.trim() !== '')
                  ?.map((testCase: any, testIndex: number) => ({
                    input: testCase.input || '',
                    expectedOutput: testCase.expectedOutput,
                    description: testCase.description || `テストケース ${testIndex + 1}`,
                    order: testIndex + 1
                  })) || []
              }
            })) || []
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
    })

    return NextResponse.json({
      message: 'レッスンが正常に更新されました',
      lesson: updatedLesson
    })
  } catch (error) {
    console.error('レッスン更新エラー:', error)
    return NextResponse.json(
      { error: 'レッスンの更新中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// レッスン削除
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
  } catch (error) {
    return NextResponse.json(
      { error: '管理者権限が必要です' },
      { status: 403 }
    )
  }

  try {
    await prisma.lesson.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'レッスンが正常に削除されました'
    })
  } catch (error) {
    console.error('レッスン削除エラー:', error)
    return NextResponse.json(
      { error: 'レッスンの削除中にエラーが発生しました' },
      { status: 500 }
    )
  }
}