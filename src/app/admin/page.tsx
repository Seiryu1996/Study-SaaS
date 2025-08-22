'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import { useTranslation } from '@/lib/i18n'

interface ExerciseForm {
  title: string
  description: string
  starterCode: string
  solution: string
  hints: string[]
  order: number
  testCases: Array<{
    input?: string
    expectedOutput: string
    description: string
  }>
}

interface LessonForm {
  title: string
  description: string
  language: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  exercises: ExerciseForm[]
}

export default function AdminPage() {
  const { t } = useTranslation()
  const [lesson, setLesson] = useState<LessonForm>({
    title: '',
    description: '',
    language: 'javascript',
    difficulty: 'BEGINNER',
    exercises: []
  })

  const [currentExercise, setCurrentExercise] = useState<ExerciseForm>({
    title: '',
    description: '',
    starterCode: '',
    solution: '',
    hints: [''],
    order: 1,
    testCases: [{ expectedOutput: '', description: '' }]
  })

  const addHint = () => {
    setCurrentExercise({
      ...currentExercise,
      hints: [...currentExercise.hints, '']
    })
  }

  const updateHint = (index: number, value: string) => {
    const newHints = [...currentExercise.hints]
    newHints[index] = value
    setCurrentExercise({ ...currentExercise, hints: newHints })
  }

  const addTestCase = () => {
    setCurrentExercise({
      ...currentExercise,
      testCases: [...currentExercise.testCases, { expectedOutput: '', description: '' }]
    })
  }

  const updateTestCase = (index: number, field: string, value: string) => {
    const newTestCases = [...currentExercise.testCases]
    newTestCases[index] = { ...newTestCases[index], [field]: value }
    setCurrentExercise({ ...currentExercise, testCases: newTestCases })
  }

  const addExercise = () => {
    setLesson({
      ...lesson,
      exercises: [...lesson.exercises, { ...currentExercise }]
    })
    
    // Reset form
    setCurrentExercise({
      title: '',
      description: '',
      starterCode: '',
      solution: '',
      hints: [''],
      order: lesson.exercises.length + 2,
      testCases: [{ expectedOutput: '', description: '' }]
    })
  }

  const createLesson = async () => {
    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson)
      })
      
      if (response.ok) {
        alert('レッスンが正常に作成されました！')
        // Reset form
        setLesson({
          title: '',
          description: '',
          language: 'javascript',
          difficulty: 'BEGINNER',
          exercises: []
        })
      } else {
        alert('エラーが発生しました')
      }
    } catch (error) {
      alert('エラーが発生しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">管理パネル - レッスン作成</h1>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">レッスン情報</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">レッスンタイトル</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JavaScript 基礎"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">プログラミング言語</label>
              <select
                value={lesson.language}
                onChange={(e) => setLesson({ ...lesson, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="typescript">TypeScript</option>
                <option value="csharp">C#</option>
                <option value="go">Go</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">レッスン説明</label>
            <textarea
              value={lesson.description}
              onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="このレッスンの内容を説明してください..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">難易度</label>
            <select
              value={lesson.difficulty}
              onChange={(e) => setLesson({ ...lesson, difficulty: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BEGINNER">初級</option>
              <option value="INTERMEDIATE">中級</option>
              <option value="ADVANCED">上級</option>
            </select>
          </div>
        </div>

        {/* Exercise Form */}
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">演習を追加</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">演習タイトル</label>
              <input
                type="text"
                value={currentExercise.title}
                onChange={(e) => setCurrentExercise({ ...currentExercise, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="変数とデータ型"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">順番</label>
              <input
                type="number"
                value={currentExercise.order}
                onChange={(e) => setCurrentExercise({ ...currentExercise, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">演習説明</label>
            <textarea
              value={currentExercise.description}
              onChange={(e) => setCurrentExercise({ ...currentExercise, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="この演習で学ぶ内容を説明してください..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">スターターコード</label>
              <textarea
                value={currentExercise.starterCode}
                onChange={(e) => setCurrentExercise({ ...currentExercise, starterCode: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="// 初期コードとコメント&#10;// ここにコードを書いてください:"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">解答コード</label>
              <textarea
                value={currentExercise.solution}
                onChange={(e) => setCurrentExercise({ ...currentExercise, solution: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="完全な解答コード"
              />
            </div>
          </div>

          {/* Hints */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">ヒント</label>
              <button
                onClick={addHint}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                ヒントを追加
              </button>
            </div>
            {currentExercise.hints.map((hint, index) => (
              <input
                key={index}
                type="text"
                value={hint}
                onChange={(e) => updateHint(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder={`ヒント ${index + 1}`}
              />
            ))}
          </div>

          {/* Test Cases */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">テストケース</label>
              <button
                onClick={addTestCase}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                テストケースを追加
              </button>
            </div>
            {currentExercise.testCases.map((testCase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">入力 (オプション)</label>
                    <input
                      type="text"
                      value={testCase.input || ''}
                      onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="入力データ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">期待される出力</label>
                    <input
                      type="text"
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="期待される結果"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">説明</label>
                    <input
                      type="text"
                      value={testCase.description}
                      onChange={(e) => updateTestCase(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="テストの説明"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addExercise}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            演習を追加
          </button>
        </div>

        {/* Created Exercises List */}
        {lesson.exercises.length > 0 && (
          <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">作成された演習 ({lesson.exercises.length})</h2>
            <div className="space-y-2">
              {lesson.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{exercise.order}. {exercise.title}</span>
                    <span className="text-sm text-gray-600 ml-2">({exercise.testCases.length} テストケース)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Lesson Button */}
        <div className="text-center">
          <button
            onClick={createLesson}
            disabled={lesson.exercises.length === 0 || !lesson.title}
            className="px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            レッスンを作成
          </button>
        </div>
      </div>
    </div>
  )
}