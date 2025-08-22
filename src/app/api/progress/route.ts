import { NextRequest, NextResponse } from 'next/server'
import { updateExerciseProgress, submitCode, getUserLessonProgress } from '@/lib/progress'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exerciseId, completed, code, language } = body

    if (!exerciseId) {
      return NextResponse.json(
        { error: 'Exercise ID is required' },
        { status: 400 }
      )
    }

    // Submit code if provided
    if (code && language) {
      await submitCode(exerciseId, code, language)
    }

    // Update progress
    const progress = await updateExerciseProgress(exerciseId, completed)

    return NextResponse.json({
      success: true,
      progress
    })
  } catch (error) {
    console.error('Progress tracking error:', error)
    
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      )
    }

    const progressData = await getUserLessonProgress(lessonId)

    if (!progressData) {
      return NextResponse.json(
        { error: 'Lesson not found or user not authenticated' },
        { status: 404 }
      )
    }

    return NextResponse.json(progressData)
  } catch (error) {
    console.error('Progress retrieval error:', error)
    
    if (error instanceof Error && error.message === 'User not authenticated') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}