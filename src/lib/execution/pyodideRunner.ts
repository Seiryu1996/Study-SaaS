// Pyodide-based Python execution
export interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
}

export interface ExecutionRequest {
  code: string
  language: string
  input?: string
}

class PyodideRunner {
  private pyodide: any = null
  private isLoading = false
  private loadPromise: Promise<void> | null = null

  async init(): Promise<void> {
    if (this.pyodide) return
    if (this.isLoading) {
      await this.loadPromise
      return
    }

    this.isLoading = true
    this.loadPromise = this.loadPyodide()
    
    try {
      await this.loadPromise
    } finally {
      this.isLoading = false
    }
  }

  private async loadPyodide(): Promise<void> {
    try {
      // Load Pyodide from CDN directly
      if (typeof window === 'undefined') {
        throw new Error('Pyodide can only run in the browser')
      }

      // Check if loadPyodide is already available globally
      let loadPyodideFunc = (window as any).loadPyodide
      
      if (!loadPyodideFunc) {
        // Load Pyodide script dynamically
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
        
        loadPyodideFunc = (window as any).loadPyodide
      }
      
      this.pyodide = await loadPyodideFunc({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
      })
      
      console.log('✅ Pyodide loaded successfully')
    } catch (error) {
      console.error('❌ Failed to load Pyodide:', error)
      throw new Error('Failed to initialize Python environment')
    }
  }

  async executePython(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()
    
    try {
      await this.init()
      
      // Setup stdout/stderr capture
      const setupCode = `
import sys
from io import StringIO
import contextlib

_stdout = StringIO()
_stderr = StringIO()

@contextlib.contextmanager
def capture_output():
    old_stdout, old_stderr = sys.stdout, sys.stderr
    try:
        sys.stdout, sys.stderr = _stdout, _stderr
        yield
    finally:
        sys.stdout, sys.stderr = old_stdout, old_stderr

def get_output():
    return _stdout.getvalue()

def get_errors():
    return _stderr.getvalue()

def clear_output():
    _stdout.truncate(0)
    _stdout.seek(0)
    _stderr.truncate(0)
    _stderr.seek(0)
`
      
      await this.pyodide.runPython(setupCode)
      
      // Clear previous output
      await this.pyodide.runPython('clear_output()')
      
      // Add input to globals if provided
      if (input) {
        this.pyodide.globals.set('__input_data__', input)
        await this.pyodide.runPython(`
def input(prompt=''):
    if prompt:
        print(prompt, end='')
    return __input_data__
`)
      }
      
      // Execute user code with output capture
      const executionCode = `
with capture_output():
    try:
${code.split('\n').map(line => '        ' + line).join('\n')}
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
`
      
      await this.pyodide.runPython(executionCode)
      
      // Get results
      const output = await this.pyodide.runPython('get_output()')
      const errors = await this.pyodide.runPython('get_errors()')
      
      return {
        output: output || 'No output',
        error: errors || undefined,
        executionTime: Date.now() - startTime
      }
      
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Python execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  isReady(): boolean {
    return this.pyodide !== null && !this.isLoading
  }

  getStatus(): string {
    if (this.isLoading) return 'Loading Python environment...'
    if (this.pyodide) return 'Python ready'
    return 'Python not initialized'
  }
}

// Singleton instance
export const pyodideRunner = new PyodideRunner()