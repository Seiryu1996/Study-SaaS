// Monaco Editor types
export interface EditorProps {
  language: string
  value: string
  onChange: (value: string | undefined) => void
  theme?: 'light' | 'dark'
  readOnly?: boolean
}

// Lesson types
export interface Lesson {
  id: string
  title: string
  description: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: Exercise[]
}

export interface Exercise {
  id: string
  title: string
  description: string
  starterCode: string
  solution: string
  hints: string[]
  testCases: TestCase[]
}

export interface TestCase {
  input: string
  expectedOutput: string
  description: string
}

// User types
export interface User {
  id: string
  email: string
  name: string
  progress: UserProgress[]
}

export interface UserProgress {
  lessonId: string
  exerciseId: string
  completed: boolean
  completedAt?: Date
  attempts: number
}