'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'

interface TestCase {
  input: string
  expectedOutput: string
  description: string
  order: number
}

interface Exercise {
  title: string
  description: string
  starterCode: string
  solution: string
  hints: string[]
  order: number
  testCases: TestCase[]
}

interface NewLesson {
  title: string
  description: string
  language: string
  difficulty: string
  exercises: Exercise[]
}

export default function NewLessonPage() {
  const router = useRouter()
  const [lesson, setLesson] = useState<NewLesson>({
    title: '',
    description: '',
    language: 'javascript',
    difficulty: 'BEGINNER',
    exercises: [
      {
        title: '',
        description: '',
        starterCode: '',
        solution: '',
        hints: [''],
        order: 1,
        testCases: [
          { input: '', expectedOutput: '', description: 'テストケース 1', order: 1 }
        ]
      }
    ]
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!lesson.title || !lesson.description) {
      alert('タイトルと説明は必須です')
      return
    }

    if (lesson.exercises.length === 0) {
      alert('少なくとも1つのエクササイズが必要です')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lesson)
      })

      if (!response.ok) {
        throw new Error('レッスンの作成に失敗しました')
      }

      alert('レッスンが作成されました')
      router.push('/admin')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setSaving(false)
    }
  }

  const addExercise = () => {
    const newExercise: Exercise = {
      title: '',
      description: '',
      starterCode: '',
      solution: '',
      hints: [''],
      order: lesson.exercises.length + 1,
      testCases: [{ input: '', expectedOutput: '', description: 'テストケース 1', order: 1 }]
    }

    setLesson({
      ...lesson,
      exercises: [...lesson.exercises, newExercise]
    })
  }

  const removeExercise = (index: number) => {
    const updatedExercises = lesson.exercises.filter((_, i) => i !== index)
      .map((ex, i) => ({ ...ex, order: i + 1 }))

    setLesson({
      ...lesson,
      exercises: updatedExercises
    })
  }

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = [...lesson.exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }

    setLesson({
      ...lesson,
      exercises: updatedExercises
    })
  }

  const addTestCase = (exerciseIndex: number) => {
    const updatedExercises = [...lesson.exercises]
    const exercise = updatedExercises[exerciseIndex]
    const newTestCase: TestCase = {
      input: '',
      expectedOutput: '',
      description: `テストケース ${exercise.testCases.length + 1}`,
      order: exercise.testCases.length + 1
    }

    exercise.testCases.push(newTestCase)
    setLesson({ ...lesson, exercises: updatedExercises })
  }

  const removeTestCase = (exerciseIndex: number, testCaseIndex: number) => {
    const updatedExercises = [...lesson.exercises]
    const exercise = updatedExercises[exerciseIndex]
    exercise.testCases = exercise.testCases.filter((_, i) => i !== testCaseIndex)
      .map((tc, i) => ({ ...tc, order: i + 1 }))

    setLesson({ ...lesson, exercises: updatedExercises })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            新しいレッスンを作成
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {saving ? '作成中...' : '作成'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              基本情報
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="レッスンのタイトルを入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  言語
                </label>
                <select
                  value={lesson.language}
                  onChange={(e) => setLesson({ ...lesson, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  難易度
                </label>
                <select
                  value={lesson.difficulty}
                  onChange={(e) => setLesson({ ...lesson, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="BEGINNER">初級</option>
                  <option value="INTERMEDIATE">中級</option>
                  <option value="ADVANCED">上級</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                説明 *
              </label>
              <textarea
                value={lesson.description}
                onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="レッスンの説明を入力"
              />
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                エクササイズ
              </h2>
              <button
                onClick={addExercise}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                エクササイズを追加
              </button>
            </div>

            {lesson.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    エクササイズ {exerciseIndex + 1}
                  </h3>
                  {lesson.exercises.length > 1 && (
                    <button
                      onClick={() => removeExercise(exerciseIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      削除
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      タイトル
                    </label>
                    <input
                      type="text"
                      value={exercise.title}
                      onChange={(e) => updateExercise(exerciseIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="エクササイズのタイトルを入力"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      説明
                    </label>
                    <textarea
                      value={exercise.description}
                      onChange={(e) => updateExercise(exerciseIndex, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="エクササイズの説明を入力"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        スターターコード
                      </label>
                      <textarea
                        value={exercise.starterCode}
                        onChange={(e) => updateExercise(exerciseIndex, 'starterCode', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                        placeholder="// スターターコードを入力"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        解答
                      </label>
                      <textarea
                        value={exercise.solution}
                        onChange={(e) => updateExercise(exerciseIndex, 'solution', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                        placeholder="// 解答コードを入力"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ヒント
                    </label>
                    {exercise.hints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={hint}
                          onChange={(e) => {
                            const newHints = [...exercise.hints]
                            newHints[hintIndex] = e.target.value
                            updateExercise(exerciseIndex, 'hints', newHints)
                          }}
                          placeholder={`ヒント ${hintIndex + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newHints = exercise.hints.filter((_, i) => i !== hintIndex)
                            updateExercise(exerciseIndex, 'hints', newHints)
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newHints = [...exercise.hints, '']
                        updateExercise(exerciseIndex, 'hints', newHints)
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ヒントを追加
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        テストケース
                      </label>
                      <button
                        onClick={() => addTestCase(exerciseIndex)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        テストケースを追加
                      </button>
                    </div>
                    
                    {exercise.testCases.map((testCase, testCaseIndex) => (
                      <div key={testCaseIndex} className="border border-gray-200 dark:border-gray-600 rounded p-3 mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            テストケース {testCaseIndex + 1}
                          </span>
                          {exercise.testCases.length > 1 && (
                            <button
                              onClick={() => removeTestCase(exerciseIndex, testCaseIndex)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              削除
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              入力
                            </label>
                            <textarea
                              value={testCase.input}
                              onChange={(e) => {
                                const updatedTestCases = [...exercise.testCases]
                                updatedTestCases[testCaseIndex].input = e.target.value
                                updateExercise(exerciseIndex, 'testCases', updatedTestCases)
                              }}
                              rows={2}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                              placeholder="テスト入力を入力"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                              期待する出力
                            </label>
                            <textarea
                              value={testCase.expectedOutput}
                              onChange={(e) => {
                                const updatedTestCases = [...exercise.testCases]
                                updatedTestCases[testCaseIndex].expectedOutput = e.target.value
                                updateExercise(exerciseIndex, 'testCases', updatedTestCases)
                              }}
                              rows={2}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                              placeholder="期待する出力を入力"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}