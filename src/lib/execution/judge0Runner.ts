// Judge0 API-based code execution (professional approach)
import { ExecutionResult } from './codeRunner'

// Judge0 language IDs
const LANGUAGE_IDS = {
  'go': 60,         // Go 1.13.5
  'ruby': 72,       // Ruby 2.7.0
  'php': 68,        // PHP 7.4.1
  'csharp': 51,     // C# (.NET Core 3.1)
  'python': 71,     // Python 3.8.1
  'javascript': 63, // JavaScript (Node.js 12.14.0)
  'typescript': 74  // TypeScript 3.7.4
}

class Judge0Runner {
  private readonly baseURL = 'https://judge0-ce.p.rapidapi.com'
  private readonly headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.JUDGE0_API_KEY || '',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }

  async executeCode(language: string, code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()

    try {
      // Check if API key is available
      if (!process.env.JUDGE0_API_KEY) {
        return {
          output: '',
          error: 'Judge0 API key not configured. Please set JUDGE0_API_KEY environment variable.',
          executionTime: Date.now() - startTime
        }
      }

      const languageId = LANGUAGE_IDS[language.toLowerCase() as keyof typeof LANGUAGE_IDS]
      if (!languageId) {
        return {
          output: '',
          error: `Language ${language} not supported by Judge0 API`,
          executionTime: Date.now() - startTime
        }
      }

      // Submit code for execution
      const submissionResponse = await fetch(`${this.baseURL}/submissions`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          language_id: languageId,
          source_code: btoa(code), // Base64 encode
          stdin: input ? btoa(input) : undefined,
          expected_output: undefined
        })
      })

      if (!submissionResponse.ok) {
        throw new Error(`Submission failed: ${submissionResponse.statusText}`)
      }

      const { token } = await submissionResponse.json()

      // Poll for results
      let attempts = 0
      const maxAttempts = 20
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
        
        const resultResponse = await fetch(`${this.baseURL}/submissions/${token}`, {
          headers: this.headers
        })

        if (!resultResponse.ok) {
          throw new Error(`Result fetch failed: ${resultResponse.statusText}`)
        }

        const result = await resultResponse.json()
        
        // Status: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, etc.
        if (result.status.id > 2) {
          const output = result.stdout ? atob(result.stdout) : ''
          const error = result.stderr ? atob(result.stderr) : 
                       result.compile_output ? atob(result.compile_output) : ''

          return {
            output: output || 'No output',
            error: error || undefined,
            executionTime: Date.now() - startTime
          }
        }
        
        attempts++
      }

      return {
        output: '',
        error: 'Execution timeout - code took too long to execute',
        executionTime: Date.now() - startTime
      }

    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Judge0 execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  async executeGo(code: string, input?: string): Promise<ExecutionResult> {
    return this.executeCode('go', code, input)
  }

  async executeRuby(code: string, input?: string): Promise<ExecutionResult> {
    return this.executeCode('ruby', code, input)
  }

  async executePHP(code: string, input?: string): Promise<ExecutionResult> {
    return this.executeCode('php', code, input)
  }

  async executeCSharp(code: string, input?: string): Promise<ExecutionResult> {
    return this.executeCode('csharp', code, input)
  }
}

export const judge0Runner = new Judge0Runner()