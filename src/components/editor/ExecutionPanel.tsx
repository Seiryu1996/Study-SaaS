'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'

interface ExecutionPanelProps {
  code: string
  language: string
  onRun?: () => void
}

interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
  htmlPreview?: boolean
  needsClientExecution?: boolean
  clientCode?: string
  clientInput?: string
}

export default function ExecutionPanel({ code, language, onRun }: ExecutionPanelProps) {
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [viewMode, setViewMode] = useState<'output' | 'preview'>('output')
  const { t } = useTranslation()

  const executePythonClient = async (pythonCode: string, input?: string) => {
    try {
      // Import Pyodide dynamically (client-side only)
      const { pyodideRunner } = await import('@/lib/execution/pyodideRunner')
      const pythonResult = await pyodideRunner.executePython(pythonCode, input)
      setResult(pythonResult)
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : 'Python execution failed',
        executionTime: 0
      })
    }
  }

  const executeClientCode = async (lang: string, clientCode: string, input?: string) => {
    try {
      switch (lang.toLowerCase()) {
        case 'python':
          await executePythonClient(clientCode, input)
          break
        
        case 'csharp':
        case 'cs':
          const { serverRunner: csharpServer } = await import('@/lib/execution/serverRunner')
          const csharpResult = await csharpServer.executeCSharp(clientCode, input)
          setResult(csharpResult)
          break
        
        case 'ruby':
        case 'rb':
          const { serverRunner: rubyServer } = await import('@/lib/execution/serverRunner')
          const rubyResult = await rubyServer.executeRuby(clientCode, input)
          setResult(rubyResult)
          break
        
        case 'php':
          const { serverRunner: phpServer } = await import('@/lib/execution/serverRunner')
          const phpResult = await phpServer.executePHP(clientCode, input)
          setResult(phpResult)
          break
        
        case 'go':
          const { serverRunner: goServer } = await import('@/lib/execution/serverRunner')
          const goResult = await goServer.executeGo(clientCode, input)
          setResult(goResult)
          break
        
        default:
          setResult({
            output: '',
            error: `Client-side execution for ${lang} not supported`,
            executionTime: 0
          })
      }
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : `${lang} execution failed`,
        executionTime: 0
      })
    }
  }

  const executeCode = async () => {
    if (!code.trim()) {
      setResult({
        output: '',
        error: 'No code to execute',
        executionTime: 0
      })
      return
    }

    setIsRunning(true)
    setResult(null)
    
    if (onRun) {
      onRun()
    }

    try {
      // Handle Python execution client-side directly
      if (language.toLowerCase() === 'python') {
        await executePythonClient(code)
      } else {
        // Handle other languages server-side first
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            language,
          }),
        })

        const data = await response.json()
        
        // Check if client-side execution is needed
        if (data.needsClientExecution && data.clientCode) {
          await executeClientCode(language, data.clientCode, data.clientInput)
        } else {
          setResult(data)
        }
      }
    } catch (error) {
      setResult({
        output: '',
        error: 'Failed to execute code',
        executionTime: 0
      })
    } finally {
      setIsRunning(false)
    }
  }

  const clearOutput = () => {
    setResult(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">
            {result?.htmlPreview ? t('editor.preview') : t('editor.output')}
          </h3>
          {result?.htmlPreview && (
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('output')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  viewMode === 'output' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('editor.code')}
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  viewMode === 'preview' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('editor.preview')}
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={executeCode}
            disabled={isRunning || !code.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('editor.running')}
              </>
            ) : (
              <>
                {t('editor.runCode')}
              </>
            )}
          </button>
          {result && (
            <button
              onClick={clearOutput}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {t('editor.clear')}
            </button>
          )}
        </div>
      </div>

      {result?.htmlPreview && viewMode === 'preview' ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[120px] max-h-[300px] overflow-y-auto">
          <iframe
            srcDoc={result.output}
            className="w-full h-full min-h-[120px]"
            title="HTML Preview"
            sandbox="allow-same-origin"
          />
        </div>
      ) : (
        <div className="bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 p-4 rounded-lg font-mono text-sm min-h-[120px] max-h-[300px] overflow-y-auto">
          {isRunning && (
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
              Executing code...
            </div>
          )}
          
          {result && (
            <div className="space-y-2">
              {result.error && (
                <div className="text-red-400 dark:text-red-300">
                  <div className="font-semibold">Error:</div>
                  <div>{result.error}</div>
                </div>
              )}
              
              {result.output && (
                <div className="text-green-400 dark:text-green-300">
                  <div className="font-semibold text-gray-300 dark:text-gray-400 mb-1">
                    {result.htmlPreview ? 'HTML Code:' : 'Output:'}
                  </div>
                  <pre className="whitespace-pre-wrap">{result.output}</pre>
                </div>
              )}
              
              <div className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                Execution time: {result.executionTime}ms
              </div>
            </div>
          )}
          
          {!result && !isRunning && (
            <div className="text-gray-500 dark:text-gray-400">
              Click "Run Code" to execute your code and see the output here...
            </div>
          )}
        </div>
      )}
    </div>
  )
}