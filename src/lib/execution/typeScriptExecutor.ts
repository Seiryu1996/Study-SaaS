// TypeScript execution service
export function executeTypeScript(code: string, input?: string) {
  const startTime = Date.now()
  
  try {
    // Simple TypeScript to JavaScript transpilation
    let jsCode = code
      // Remove type annotations
      .replace(/:\s*\w+(\[\])?(\s*\|\s*\w+(\[\])?)*(?=\s*[=,;)])/g, '')
      // Remove interface declarations
      .replace(/interface\s+\w+\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g, '')
      // Remove type declarations
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
      // Remove generic type parameters
      .replace(/<[\w,\s]+>/g, '')
      // Remove 'as' type assertions
      .replace(/\s+as\s+[\w\[\]|<>]+/g, '')
      // Remove export statements
      .replace(/export\s+/g, '')
      // Remove import statements
      .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '')
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim()

    // Execute as JavaScript
    const logs: string[] = []
    const sandboxConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '))
      }
    }

    const func = new Function('console', `"use strict"; ${jsCode}`)
    func(sandboxConsole)
    
    return {
      output: logs.join('\n') || 'No output',
      executionTime: Date.now() - startTime
    }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'TypeScript execution failed',
      executionTime: Date.now() - startTime
    }
  }
}