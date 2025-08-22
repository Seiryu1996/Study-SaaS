import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  const { userId } = auth()
  
  if (!userId) {
    return null
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      progress: {
        include: {
          exercise: {
            include: {
              lesson: true
            }
          }
        }
      },
      enrollments: {
        include: {
          lesson: {
            include: {
              exercises: true
            }
          }
        }
      }
    }
  })

  // If user doesn't exist, create them (fallback for webhook issues)
  if (!user) {
    user = await createUserFromClerk(userId)
  }

  return user
}

async function createUserFromClerk(clerkId: string) {
  try {
    // Create a basic user record if clerk user exists but DB record doesn't
    const user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        email: `user-${clerkId}@temp.com`, // Temporary email, will be updated by webhook
        name: 'User', // Temporary name, will be updated by webhook
      },
      include: {
        progress: {
          include: {
            exercise: {
              include: {
                lesson: true
              }
            }
          }
        },
        enrollments: {
          include: {
            lesson: {
              include: {
                exercises: true
              }
            }
          }
        }
      }
    })
    
    console.log(`Created fallback user record for Clerk ID: ${clerkId}`)
    return user
  } catch (error) {
    console.error('Error creating fallback user:', error)
    throw new Error('User not found and could not be created')
  }
}

async function getOrCreateUser(clerkId: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkId }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkId,
        email: `user-${clerkId}@temp.com`,
        name: 'User',
      }
    })
    console.log(`Created fallback user record for Clerk ID: ${clerkId}`)
  }

  return user
}

export async function enrollUserInLesson(lessonId: string) {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const user = await getOrCreateUser(userId)

  // Check if already enrolled
  const existingEnrollment = await prisma.lessonEnrollment.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lessonId
      }
    }
  })

  if (existingEnrollment) {
    return existingEnrollment
  }

  // Create enrollment
  const enrollment = await prisma.lessonEnrollment.create({
    data: {
      userId: user.id,
      lessonId: lessonId
    }
  })

  return enrollment
}

export async function updateExerciseProgress(exerciseId: string, completed: boolean = false) {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const user = await getOrCreateUser(userId)

  // Upsert progress
  const progress = await prisma.userProgress.upsert({
    where: {
      userId_exerciseId: {
        userId: user.id,
        exerciseId: exerciseId
      }
    },
    update: {
      attempts: { increment: 1 },
      lastAttempt: new Date(),
      ...(completed && {
        isCompleted: true,
        completedAt: new Date()
      })
    },
    create: {
      userId: user.id,
      exerciseId: exerciseId,
      attempts: 1,
      isCompleted: completed,
      ...(completed && { completedAt: new Date() })
    }
  })

  return progress
}

export async function getUserLessonProgress(lessonId: string) {
  const { userId } = auth()
  
  if (!userId) {
    return null
  }

  const user = await getOrCreateUser(userId)

  // Get lesson with exercises and user progress
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      exercises: {
        include: {
          progress: {
            where: { userId: user.id }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!lesson) {
    return null
  }

  // Calculate progress statistics
  const totalExercises = lesson.exercises.length
  const completedExercises = lesson.exercises.filter(
    exercise => exercise.progress.some(p => p.isCompleted)
  ).length
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

  return {
    lesson,
    totalExercises,
    completedExercises,
    progressPercentage: Math.round(progressPercentage)
  }
}

export async function submitCode(exerciseId: string, code: string, language: string) {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const user = await getOrCreateUser(userId)

  // Create code submission
  const submission = await prisma.codeSubmission.create({
    data: {
      userId: user.id,
      exerciseId: exerciseId,
      code: code,
      language: language,
      status: 'PENDING'
    }
  })

  // Update exercise progress (attempt)
  await updateExerciseProgress(exerciseId, false)

  return submission
}