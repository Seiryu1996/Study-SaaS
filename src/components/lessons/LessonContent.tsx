'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import CodeEditor from '@/components/editor/CodeEditor'
import ExecutionPanel from '@/components/editor/ExecutionPanel'
import TestRunner from '@/components/editor/TestRunner'

interface TestCase {
  id: string
  input?: string | null
  expectedOutput: string
  description: string
}

interface Exercise {
  id: string
  title: string
  description: string
  starterCode: string
  solution: string
  hints: string[]
  order: number
  testCases?: TestCase[]
}

interface Lesson {
  id: string
  title: string
  description: string
  language: string
  exercises: Exercise[]
}

interface LessonContentProps {
  lesson: Lesson
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const { user, isSignedIn } = useUser()
  const [currentExercise, setCurrentExercise] = useState(0)
  const [code, setCode] = useState('')
  const [htmlCode, setHtmlCode] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [exerciseProgress, setExerciseProgress] = useState<{ [key: string]: boolean }>({})

  const exercise = lesson.exercises[currentExercise]
  const isCSSLesson = lesson.language.toLowerCase() === 'css'

  // Auto-enroll user when they access a lesson
  useEffect(() => {
    if (isSignedIn && user && !isEnrolled) {
      enrollInLesson()
    }
  }, [isSignedIn, user, lesson.id])

  // Load exercise progress
  useEffect(() => {
    if (isSignedIn && user) {
      loadExerciseProgress()
    }
  }, [isSignedIn, user, lesson.id])

  // Set starter code when exercise changes
  useEffect(() => {
    if (exercise?.starterCode) {
      setCode(exercise.starterCode)
      setShowHints(false)
      setShowSolution(false)
      
      // Set HTML code for CSS lessons (extract from starterCode)
      if (isCSSLesson) {
        // CSSレッスンの場合、starterCodeからHTMLを抽出
        const htmlStart = exercise.starterCode.indexOf('<!DOCTYPE html>')
        if (htmlStart !== -1) {
          const htmlCode = exercise.starterCode.substring(htmlStart)
          setHtmlCode(htmlCode)
          // CSS部分のみをCSSエディタに設定
          const cssMatch = exercise.starterCode.match(/\/\*[\s\S]*?\*\/(?:\s*\/\*[\s\S]*?\*\/)*/g)
          if (cssMatch) {
            setCode(cssMatch.join('\n'))
          } else {
            setCode('/* ここにCSSを書いてください */\n')
          }
        } else {
          // フォールバック用のデフォルトHTML
          setHtmlCode(`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Exercise</title>
    <style>
        /* Your CSS code will be applied here */
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <p>Edit the HTML and CSS to complete the exercise.</p>
</body>
</html>`)
        }
      }
    }
  }, [currentExercise, exercise?.id, isCSSLesson])

  const enrollInLesson = async () => {
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id })
      })
      
      if (response.ok) {
        setIsEnrolled(true)
      }
    } catch (error) {
      console.error('Failed to enroll in lesson:', error)
    }
  }

  const loadExerciseProgress = async () => {
    try {
      const response = await fetch(`/api/progress?lessonId=${lesson.id}`)
      
      if (response.ok) {
        const data = await response.json()
        const progressMap: { [key: string]: boolean } = {}
        
        if (data.lesson?.exercises) {
          data.lesson.exercises.forEach((exercise: any) => {
            progressMap[exercise.id] = exercise.progress.some((p: any) => p.isCompleted)
          })
        }
        
        setExerciseProgress(progressMap)
      }
    } catch (error) {
      console.error('Failed to load exercise progress:', error)
    }
  }

  const updateProgress = async (exerciseId: string, completed: boolean = false) => {
    if (!isSignedIn) return

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId,
          completed,
          code: completed ? code : undefined,
          language: lesson.language
        })
      })

      if (response.ok) {
        setExerciseProgress(prev => ({
          ...prev,
          [exerciseId]: completed
        }))
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
  }

  const handleHtmlChange = (value: string | undefined) => {
    setHtmlCode(value || '')
  }

  const handleNextExercise = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setShowHints(false)
      setShowSolution(false)
    }
  }

  const handlePrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setShowHints(false)
      setShowSolution(false)
    }
  }

  const loadStarterCode = () => {
    setCode(exercise.starterCode)
    setShowSolution(false)
  }

  const loadSolution = () => {
    setCode(exercise.solution)
    setShowSolution(true)
  }

  const markAsCompleted = () => {
    updateProgress(exercise.id, true)
  }

  const runCode = () => {
    // Track attempt
    updateProgress(exercise.id, false)
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:text-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{lesson.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Instructions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Exercise {exercise.order}: {exercise.title}
              </h2>
              <div className="flex items-center gap-3">
                {exerciseProgress[exercise.id] && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    ✅ Completed
                  </span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentExercise + 1} of {lesson.exercises.length}
                </span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {exercise.description}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={loadStarterCode}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Load Starter Code
              </button>
              <button
                onClick={() => setShowHints(!showHints)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {showHints ? 'Hide' : 'Show'} Hints
              </button>
              <button
                onClick={loadSolution}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Show Solution
              </button>
            </div>
          </div>

          {showHints && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">💡 Hints:</h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-300">
                {exercise.hints.map((hint: string, index: number) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handlePrevExercise}
              disabled={currentExercise === 0}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextExercise}
              disabled={currentExercise === lesson.exercises.length - 1}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {isCSSLesson ? 'CSS & HTML Editor' : 'Code Editor'}
            </h3>
            {showSolution && (
              <span className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
                ✅ Solution Loaded
              </span>
            )}
          </div>

          {isCSSLesson ? (
            <div className="space-y-4">
              {/* CSS Editor */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CSS Code:</h4>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <CodeEditor
                    language="css"
                    value={code}
                    onChange={handleCodeChange}
                    height="200px"
                  />
                </div>
              </div>
              
              {/* HTML Editor */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">HTML Code:</h4>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <CodeEditor
                    language="html"
                    value={htmlCode}
                    onChange={handleHtmlChange}
                    height="200px"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <CodeEditor
                language={lesson.language}
                value={code}
                onChange={handleCodeChange}
                height="400px"
              />
            </div>
          )}

          <ExecutionPanel 
            code={isCSSLesson ? htmlCode.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${code}\n</style>`) : code}
            language={isCSSLesson ? 'html' : lesson.language}
            onRun={runCode}
          />

          {exercise.testCases && exercise.testCases.length > 0 && (
            <TestRunner
              code={code}
              language={lesson.language}
              testCases={exercise.testCases}
              onTestRun={(results) => {
                // Auto-mark as completed if all tests pass
                const allPassed = results.every(r => r.passed)
                if (allPassed && results.length > 0) {
                  markAsCompleted()
                }
              }}
            />
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={markAsCompleted}
              disabled={!code.trim() || exerciseProgress[exercise.id]}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exerciseProgress[exercise.id] ? '✅ Completed' : 'Mark as Completed'}
            </button>
            
            <div className="text-sm text-gray-500">
              Progress: {Object.values(exerciseProgress).filter(Boolean).length} / {lesson.exercises.length} exercises completed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}