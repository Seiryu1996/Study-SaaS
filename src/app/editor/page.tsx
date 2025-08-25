'use client'

import { useState } from 'react'
import CodeEditor from '@/components/editor/CodeEditor'
import LanguageSelector from '@/components/editor/LanguageSelector'
import ExecutionPanel from '@/components/editor/ExecutionPanel'
import Header from '@/components/layout/Header'
import { useTheme } from '@/contexts/ThemeContext'

const DEFAULT_CODE = {
  javascript: `// Welcome to the JavaScript playground!
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
  typescript: `// Welcome to the TypeScript playground!
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: "World", age: 25 };
console.log(greet(user));`,
  python: `# Welcome to the Python playground!
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
  html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to the HTML playground!</p>
</body>
</html>`,
  css: `/* Welcome to the CSS playground! */
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}`,
  go: `// Welcome to the Go playground!
package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println(greet("World"))
}`,
  ruby: `# Welcome to the Ruby playground!
def greet(name)
    "Hello, #{name}!"
end

puts greet("World")`,
  php: `<?php
// Welcome to the PHP playground!
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World") . "\\n";
?>`,
  csharp: `// Welcome to the C# playground!
using System;

class Program {
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static void Main() {
        Console.WriteLine(Greet("World"));
    }
}`
}

export default function EditorPage() {
  const { theme, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(DEFAULT_CODE.javascript)

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE] || '')
  }

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
  }

  const handleRun = () => {
    console.log('Running code:', code)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Code Editor</h1>
        <div className="flex items-center justify-between mb-4">
          <LanguageSelector value={language} onChange={handleLanguageChange} />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <CodeEditor
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme={theme}
          height="500px"
        />
      </div>

      <div className="mt-6">
        <ExecutionPanel 
          code={code} 
          language={language} 
          onRun={handleRun}
        />
        </div>
      </div>
    </div>
  )
}