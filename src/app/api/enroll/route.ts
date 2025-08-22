import { NextRequest, NextResponse } from 'next/server'
import { enrollUserInLesson } from '@/lib/progress'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lessonId } = body

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      )
    }

    const enrollment = await enrollUserInLesson(lessonId)

    return NextResponse.json({
      success: true,
      enrollment
    })
  } catch (error) {
    console.error('Enrollment error:', error)
    
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