'use client'

import { useState } from 'react'

interface TestCase {
  id: string
  input?: string | null
  expectedOutput: string
  description: string
}

interface TestResult {
  testId: string
  passed: boolean
  actualOutput: string
  expectedOutput: string
  error?: string
}

interface TestRunnerProps {
  code: string
  language: string
  testCases: TestCase[]
  onTestRun?: (results: TestResult[]) => void
}

export default function TestRunner({ code, language, testCases, onTestRun }: TestRunnerProps) {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    if (!code.trim() || testCases.length === 0) {
      return
    }

    setIsRunning(true)
    const testResults: TestResult[] = []

    for (const testCase of testCases) {
      try {
        let result: any
        let passed = false
        
        // Handle CSS tests differently - visual evaluation
        if (language.toLowerCase() === 'css') {
          result = await executeCSSTest(code, testCase)
          passed = result.passed
        }
        // Handle Python execution client-side
        else if (language.toLowerCase() === 'python') {
          result = await executePythonTest(code, testCase.input || undefined)
          const actualOutput = result.output?.trim() || ''
          const expectedOutput = testCase.expectedOutput.trim()
          passed = actualOutput === expectedOutput && !result.error
        } 
        // Handle other languages server-side
        else {
          const response = await fetch('/api/execute-server', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              language,
              input: testCase.input || undefined,
            }),
          })
          result = await response.json()
          
          const actualOutput = result.output?.trim() || ''
          const expectedOutput = testCase.expectedOutput.trim()
          passed = actualOutput === expectedOutput && !result.error
        }

        testResults.push({
          testId: testCase.id,
          passed,
          actualOutput: result.output || result.actualOutput || '',
          expectedOutput: testCase.expectedOutput,
          error: result.error
        })
      } catch (error) {
        testResults.push({
          testId: testCase.id,
          passed: false,
          actualOutput: '',
          expectedOutput: testCase.expectedOutput,
          error: 'Test execution failed'
        })
      }
    }

    setResults(testResults)
    setIsRunning(false)
    
    if (onTestRun) {
      onTestRun(testResults)
    }
  }

  const executeCSSTest = async (cssCode: string, testCase: TestCase) => {
    try {
      // CSS テストでは特定のスタイルプロパティの存在をチェック
      const testDescription = testCase.description.toLowerCase()
      let passed = false
      let actualOutput = 'CSS評価中...'
      
      // 基本的なCSSプロパティチェック
      if (testDescription.includes('color') || testDescription.includes('色')) {
        passed = /color\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? 'カラープロパティが設定されています' : 'カラープロパティが見つかりません'
      }
      else if (testDescription.includes('background') || testDescription.includes('背景')) {
        passed = /background(-color)?\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? '背景プロパティが設定されています' : '背景プロパティが見つかりません'
      }
      else if (testDescription.includes('font') || testDescription.includes('フォント')) {
        passed = /font(-size|-family|-weight)?\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? 'フォントプロパティが設定されています' : 'フォントプロパティが見つかりません'
      }
      else if (testDescription.includes('margin') || testDescription.includes('マージン')) {
        passed = /margin(-top|-bottom|-left|-right)?\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? 'マージンプロパティが設定されています' : 'マージンプロパティが見つかりません'
      }
      else if (testDescription.includes('padding') || testDescription.includes('パディング')) {
        passed = /padding(-top|-bottom|-left|-right)?\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? 'パディングプロパティが設定されています' : 'パディングプロパティが見つかりません'
      }
      else if (testDescription.includes('border') || testDescription.includes('境界線') || testDescription.includes('ボーダー')) {
        passed = /border(-width|-style|-color|-radius)?\s*:\s*[^;]+/i.test(cssCode)
        actualOutput = passed ? 'ボーダープロパティが設定されています' : 'ボーダープロパティが見つかりません'
      }
      else if (testDescription.includes('selector') || testDescription.includes('セレクタ')) {
        // セレクタの基本パターンをチェック
        const hasElementSelector = /^[a-zA-Z][a-zA-Z0-9]*\s*\{/m.test(cssCode)
        const hasClassSelector = /\.[a-zA-Z][a-zA-Z0-9-_]*\s*\{/m.test(cssCode)
        const hasIdSelector = /#[a-zA-Z][a-zA-Z0-9-_]*\s*\{/m.test(cssCode)
        
        passed = hasElementSelector || hasClassSelector || hasIdSelector
        actualOutput = passed ? 'セレクタが正しく使用されています' : 'セレクタが見つかりません'
      }
      else {
        // 一般的なチェック - CSSが書かれているかどうか
        passed = cssCode.trim().length > 20 && /[{}]/.test(cssCode)
        actualOutput = passed ? 'CSS記述が確認できました' : 'CSS記述が不十分です'
      }
      
      return {
        passed,
        actualOutput,
        error: null
      }
    } catch (error) {
      return {
        passed: false,
        actualOutput: '',
        error: 'CSS evaluation failed'
      }
    }
  }

  const executePythonTest = async (pythonCode: string, input?: string) => {
    try {
      // Import Pyodide dynamically (client-side only)
      const { pyodideRunner } = await import('@/lib/execution/pyodideRunner')
      return await pyodideRunner.executePython(pythonCode, input)
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Python execution failed',
        executionTime: 0
      }
    }
  }

  const passedTests = results.filter(r => r.passed).length
  const totalTests = results.length

  if (testCases.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Test Cases</h3>
        <div className="flex items-center gap-3">
          {results.length > 0 && (
            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
              passedTests === totalTests 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {passedTests}/{totalTests} Tests Passed
            </div>
          )}
          <button
            onClick={runTests}
            disabled={isRunning || !code.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                🧪 Run Tests
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {testCases.map((testCase, index) => {
          const result = results.find(r => r.testId === testCase.id)
          
          return (
            <div 
              key={testCase.id}
              className={`border rounded-lg p-4 ${
                result 
                  ? result.passed 
                    ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' 
                    : 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                  : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    Test {index + 1}: {testCase.description}
                  </span>
                  {result && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.passed 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.passed ? '✅ PASS' : '❌ FAIL'}
                    </span>
                  )}
                </div>
              </div>

              {testCase.input && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Input:</span>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm font-mono mt-1 text-gray-900 dark:text-gray-100">
                    {testCase.input}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Expected Output:</span>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm font-mono mt-1 text-gray-900 dark:text-gray-100">
                    {testCase.expectedOutput}
                  </div>
                </div>

                {result && (
                  <div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Your Output:</span>
                    <div className={`p-2 rounded text-sm font-mono mt-1 ${
                      result.passed 
                        ? 'bg-green-100 dark:bg-green-900/30 text-gray-900 dark:text-gray-100' 
                        : 'bg-red-100 dark:bg-red-900/30 text-gray-900 dark:text-gray-100'
                    }`}>
                      {result.error ? (
                        <span className="text-red-600 dark:text-red-400">Error: {result.error}</span>
                      ) : (
                        result.actualOutput || '(no output)'
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {results.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            <strong>Test Summary:</strong>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {passedTests === totalTests ? (
              <span className="text-green-600 dark:text-green-400">🎉 All tests passed! Great job!</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                {totalTests - passedTests} test(s) failed. Review the output above and try again.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}