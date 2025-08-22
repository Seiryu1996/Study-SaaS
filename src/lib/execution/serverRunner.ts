// Server-side code execution for Go, Ruby, PHP, C#
import { ExecutionResult } from './codeRunner'

class ServerRunner {
  
  async executeGo(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/execute-server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'go',
          code,
          input
        })
      })
      
      const result = await response.json()
      return {
        ...result,
        executionTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Go execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  async executeRuby(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/execute-server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'ruby',
          code,
          input
        })
      })
      
      const result = await response.json()
      return {
        ...result,
        executionTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Ruby execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  async executePHP(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/execute-server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'php',
          code,
          input
        })
      })
      
      const result = await response.json()
      return {
        ...result,
        executionTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'PHP execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  async executeCSharp(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/execute-server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'csharp',
          code,
          input
        })
      })
      
      const result = await response.json()
      return {
        ...result,
        executionTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'C# execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }
}

export const serverRunner = new ServerRunner()