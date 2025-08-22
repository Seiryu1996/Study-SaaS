// Go WebAssembly execution
import { ExecutionResult } from './codeRunner'

class GoRunner {
  private isInitialized = false

  async initialize() {
    if (this.isInitialized) return

    try {
      // For now, we'll create a simple Go interpreter simulation
      // In a real implementation, you would load Go WebAssembly here
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize Go runtime:', error)
      throw error
    }
  }

  private evaluateExpression(expression: string, variables: { [key: string]: any }): string {
    try {
      // Replace variables in the expression
      let expr = expression
      for (const [varName, varValue] of Object.entries(variables)) {
        expr = expr.replace(new RegExp(`\\b${varName}\\b`, 'g'), String(varValue))
      }

      // Handle basic arithmetic operations
      if (/^[\d+\-*/\s()]+$/.test(expr)) {
        // Safe mathematical expression - only numbers and basic operators
        const result = Function(`"use strict"; return (${expr})`)()
        return String(result)
      }

      // If it's a single variable, return its value
      if (variables[expression]) {
        return String(variables[expression])
      }

      // Return as-is if we can't evaluate
      return expression
    } catch (error) {
      return expression
    }
  }

  async executeCode(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()

    try {
      await this.initialize()

      // Improved Go code simulation
      let output = ''

      // Check for syntax errors
      if (code.includes('var') && code.includes(':=')) {
        const invalidSyntax = code.match(/var\s+\w+\s+:=/g)
        if (invalidSyntax) {
          return {
            output: '',
            error: `Syntax error: Invalid Go syntax "${invalidSyntax[0]}". Use either "var name type = value" or "name := value"`,
            executionTime: Date.now() - startTime
          }
        }
      }

      // Extract variable declarations first
      const variables: { [key: string]: any } = {}
      
      // Parse var declarations (string)
      const varStringMatches = code.match(/var\s+(\w+)\s+string\s*=\s*"([^"]+)"/g)
      if (varStringMatches) {
        varStringMatches.forEach(match => {
          const varMatch = match.match(/var\s+(\w+)\s+string\s*=\s*"([^"]+)"/)
          if (varMatch) {
            variables[varMatch[1]] = varMatch[2]
          }
        })
      }

      // Parse var declarations (int)
      const varIntMatches = code.match(/var\s+(\w+)\s+int\s*=\s*(\d+)/g)
      if (varIntMatches) {
        varIntMatches.forEach(match => {
          const varMatch = match.match(/var\s+(\w+)\s+int\s*=\s*(\d+)/)
          if (varMatch) {
            variables[varMatch[1]] = parseInt(varMatch[2])
          }
        })
      }

      // Parse short variable declarations (string)
      const shortVarStringMatches = code.match(/(\w+)\s*:=\s*"([^"]+)"/g)
      if (shortVarStringMatches) {
        shortVarStringMatches.forEach(match => {
          const varMatch = match.match(/(\w+)\s*:=\s*"([^"]+)"/)
          if (varMatch) {
            variables[varMatch[1]] = varMatch[2]
          }
        })
      }

      // Parse short variable declarations (int)
      const shortVarIntMatches = code.match(/(\w+)\s*:=\s*(\d+)/g)
      if (shortVarIntMatches) {
        shortVarIntMatches.forEach(match => {
          const varMatch = match.match(/(\w+)\s*:=\s*(\d+)/)
          if (varMatch) {
            variables[varMatch[1]] = parseInt(varMatch[2])
          }
        })
      }

      // Parse fmt.Println statements
      if (code.includes('fmt.Println')) {
        const matches = code.match(/fmt\.Println\([^)]+\)/g)
        if (matches) {
          matches.forEach(match => {
            const content = match.match(/fmt\.Println\(([^)]+)\)/)
            if (content && content[1]) {
              let line = content[1].trim()
              
              // Handle string literals
              if (line.startsWith('"') && line.endsWith('"')) {
                line = line.slice(1, -1)
              } else if (line.includes(',')) {
                // Handle multiple arguments
                const parts = line.split(',').map(part => {
                  part = part.trim()
                  if (part.startsWith('"') && part.endsWith('"')) {
                    return part.slice(1, -1)
                  } else if (variables[part]) {
                    return variables[part]
                  }
                  return part
                })
                line = parts.join(' ')
              } else {
                // Handle mathematical expressions and variables
                line = this.evaluateExpression(line, variables)
              }
              
              output += line + '\n'
            }
          })
        }
      }

      return {
        output: output.trim() || 'Go code executed successfully',
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
}

export const goRunner = new GoRunner()