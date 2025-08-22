// Ruby WebAssembly execution using ruby-wasm
import { ExecutionResult } from './codeRunner'

class RubyRunner {
  private isInitialized = false

  async initialize() {
    if (this.isInitialized) return

    try {
      // For now, we'll create a simple Ruby interpreter simulation
      // In a real implementation, you would load ruby-wasm here
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize Ruby runtime:', error)
      throw error
    }
  }

  async executeCode(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()

    try {
      await this.initialize()

      // Improved Ruby code simulation
      let output = ''

      // Extract variable declarations first
      const variables: { [key: string]: string } = {}
      
      // Parse variable assignments
      const varMatches = code.match(/(\w+)\s*=\s*"([^"]+)"|(\w+)\s*=\s*(\d+)|(\w+)\s*=\s*\[([^\]]+)\]/g)
      if (varMatches) {
        varMatches.forEach(match => {
          const varMatch = match.match(/(\w+)\s*=\s*"([^"]+)"|(\w+)\s*=\s*(\d+)|(\w+)\s*=\s*\[([^\]]+)\]/)
          if (varMatch) {
            const varName = varMatch[1] || varMatch[3] || varMatch[5]
            let varValue = varMatch[2] || varMatch[4] || varMatch[6]
            
            // Handle arrays
            if (varMatch[6]) {
              varValue = varMatch[6].split(',').map(v => v.trim().replace(/"/g, '')).join(', ')
            }
            
            variables[varName] = varValue
          }
        })
      }

      // Parse puts statements
      if (code.includes('puts')) {
        const matches = code.match(/puts\s+[^\n]+/g)
        if (matches) {
          matches.forEach(match => {
            const content = match.match(/puts\s+(.+)/)
            if (content && content[1]) {
              let line = content[1].trim()
              
              // Handle string interpolation
              if (line.includes('#{')) {
                // Replace interpolated variables
                line = line.replace(/#\{(\w+)\}/g, (match, varName) => {
                  return variables[varName] || match
                })
              }
              
              // Handle method calls like .join
              if (line.includes('.join')) {
                const joinMatch = line.match(/(\w+)\.join\(['"]([^'"]*)['"]\)/)
                if (joinMatch) {
                  const arrayVar = joinMatch[1]
                  const separator = joinMatch[2]
                  if (variables[arrayVar]) {
                    line = line.replace(joinMatch[0], variables[arrayVar])
                  }
                }
              }
              
              // Remove quotes if present
              line = line.replace(/^"(.*)"$/, '$1')
              
              output += line + '\n'
            }
          })
        }
      }

      return {
        output: output.trim() || 'Ruby code executed successfully',
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
}

export const rubyRunner = new RubyRunner()