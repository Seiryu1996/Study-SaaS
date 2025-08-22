'use client'

import { Editor } from '@monaco-editor/react'
import { useState, useRef } from 'react'
import CodeLengthIndicator from './CodeLengthIndicator'
import LanguageInfo from './LanguageInfo'

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string | undefined) => void
  theme?: 'light' | 'dark'
  readOnly?: boolean
  height?: string
  showLanguageInfo?: boolean
  showLengthIndicator?: boolean
}

// Map custom language names to Monaco editor language IDs
const getMonacoLanguage = (language: string): string => {
  const languageMap: { [key: string]: string } = {
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'python': 'python',
    'py': 'python',
    'html': 'html',
    'css': 'css',
    'csharp': 'csharp',
    'cs': 'csharp',
    'go': 'go',
    'ruby': 'ruby',
    'rb': 'ruby',
    'php': 'php'
  }
  
  return languageMap[language.toLowerCase()] || language.toLowerCase()
}

export default function CodeEditor({
  language,
  value,
  onChange,
  theme = 'dark',
  readOnly = false,
  height = '400px',
  showLanguageInfo = true,
  showLengthIndicator = true
}: CodeEditorProps) {
  const [isLoading, setIsLoading] = useState(true)
  const editorRef = useRef<any>(null)
  
  const monacoLanguage = getMonacoLanguage(language)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    setIsLoading(false)
    
    // Configure Monaco editor settings
    monaco.editor.defineTheme('study-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#e2e8f0',
        'editorLineNumber.foreground': '#64748b',
        'editor.selectionBackground': '#334155',
        'editor.inactiveSelectionBackground': '#1e293b',
      }
    })

    monaco.editor.defineTheme('study-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#334155',
        'editorLineNumber.foreground': '#94a3b8',
        'editor.selectionBackground': '#e2e8f0',
        'editor.inactiveSelectionBackground': '#f1f5f9',
      }
    })

    // Set custom theme
    monaco.editor.setTheme(theme === 'dark' ? 'study-dark' : 'study-light')
  }

  const handleChange = (value: string | undefined) => {
    onChange(value)
  }

  return (
    <div className="space-y-3">
      {showLanguageInfo && (
        <LanguageInfo language={language} />
      )}
      
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white rounded-lg">
            <div className="text-sm">Loading editor...</div>
          </div>
        )}
        <Editor
          height={height}
          language={monacoLanguage}
          value={value}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          loading=""
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: readOnly,
            cursorStyle: 'line',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: 20,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            contextmenu: true,
            folding: true,
            lineNumbers: 'on',
            glyphMargin: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>

      {showLengthIndicator && (
        <CodeLengthIndicator code={value} language={language} />
      )}
    </div>
  )
}