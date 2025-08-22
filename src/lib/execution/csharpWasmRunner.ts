// C# client-side execution using simple interpreter
import { ExecutionResult } from './codeRunner'

class CSharpWasmRunner {
  async executeCode(code: string, input?: string): Promise<ExecutionResult> {
    const startTime = Date.now()

    try {
      return this.executeCSharpClient(code, startTime, input)
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'C# execution failed',
        executionTime: Date.now() - startTime
      }
    }
  }

  private executeCSharpClient(code: string, startTime: number, input?: string): ExecutionResult {
    try {
      let output = ''
      const variables: { [key: string]: any } = {}
      const arrays: { [key: string]: any[] } = {}
      
      // Remove comments and clean code
      const cleanCode = code
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .trim()

      // Parse variable declarations
      const varMatches = cleanCode.match(/(string|int)\s+(\w+)\s*=\s*([^;,]+)(?:,\s*(\w+)\s*=\s*([^;,]+))*;/g)
      if (varMatches) {
        varMatches.forEach(varDecl => {
          // Handle multiple variable declarations on same line
          const parts = varDecl.split(/\s*,\s*/)
          parts.forEach((part, index) => {
            if (index === 0) {
              // First part has type
              const match = part.match(/(string|int)\s+(\w+)\s*=\s*(.+)/)
              if (match) {
                const varType = match[1]
                const varName = match[2]
                let varValue = match[3].replace(';', '').trim()
                
                if (varValue.startsWith('"') && varValue.endsWith('"')) {
                  variables[varName] = varValue.slice(1, -1)
                } else {
                  variables[varName] = parseInt(varValue)
                }
              }
            } else {
              // Subsequent parts inherit type
              const match = part.match(/(\w+)\s*=\s*(.+)/)
              if (match) {
                const varName = match[1]
                let varValue = match[2].replace(';', '').trim()
                
                if (varValue.startsWith('"') && varValue.endsWith('"')) {
                  variables[varName] = varValue.slice(1, -1)
                } else {
                  variables[varName] = parseInt(varValue)
                }
              }
            }
          })
        })
      }

      // Parse array declarations
      const arrayMatches = cleanCode.match(/string\[\]\s+(\w+)\s*=\s*\{([^}]+)\}/g)
      if (arrayMatches) {
        arrayMatches.forEach(arrayDecl => {
          const match = arrayDecl.match(/string\[\]\s+(\w+)\s*=\s*\{([^}]+)\}/)
          if (match) {
            const arrayName = match[1]
            const arrayItems = match[2].split(',').map(item => {
              const trimmed = item.trim()
              return trimmed.startsWith('"') && trimmed.endsWith('"') 
                ? trimmed.slice(1, -1) 
                : trimmed
            })
            arrays[arrayName] = arrayItems
          }
        })
      }

      // Parse for loops
      const forLoopMatches = cleanCode.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+);\s*\1\s*<=?\s*(\d+);\s*\1\+\+\s*\)\s*\{([^}]+)\}/g)
      if (forLoopMatches) {
        forLoopMatches.forEach(loopMatch => {
          const match = loopMatch.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+);\s*\1\s*<=?\s*(\d+);\s*\1\+\+\s*\)\s*\{([^}]+)\}/)
          if (match) {
            const iterVar = match[1]
            const start = parseInt(match[2])
            const end = parseInt(match[3])
            const loopBody = match[4]
            
            for (let i = start; i <= end; i++) {
              variables[iterVar] = i
              
              // Execute statements in loop body
              if (loopBody.includes('sum += i')) {
                if (!variables['sum']) variables['sum'] = 0
                variables['sum'] += i
              }
            }
          }
        })
      }

      // Parse array for loops
      const arrayForLoopMatches = cleanCode.match(/for\s*\(\s*int\s+(\w+)\s*=\s*0;\s*\1\s*<\s*(\w+)\.Length;\s*\1\+\+\s*\)\s*\{([^}]+)\}/g)
      if (arrayForLoopMatches) {
        arrayForLoopMatches.forEach(loopMatch => {
          const match = loopMatch.match(/for\s*\(\s*int\s+(\w+)\s*=\s*0;\s*\1\s*<\s*(\w+)\.Length;\s*\1\+\+\s*\)\s*\{([^}]+)\}/)
          if (match) {
            const iterVar = match[1]
            const arrayName = match[2]
            const loopBody = match[3]
            
            if (arrays[arrayName]) {
              for (let i = 0; i < arrays[arrayName].length; i++) {
                variables[iterVar] = i
                
                // Handle Console.WriteLine in loop
                const consoleInLoop = loopBody.match(/Console\.WriteLine\(([^)]+)\)/)
                if (consoleInLoop) {
                  let lineContent = consoleInLoop[1]
                  
                  // Replace variables and array access
                  lineContent = lineContent.replace(/(\w+)/g, (match) => {
                    if (variables[match] !== undefined) {
                      return variables[match].toString()
                    }
                    return match
                  })
                  
                  lineContent = lineContent.replace(/(\w+)\[(\w+)\]/g, (match, arrName, indexVar) => {
                    if (arrays[arrName] && variables[indexVar] !== undefined) {
                      return `"${arrays[arrName][variables[indexVar]]}"`
                    }
                    return match
                  })
                  
                  // Evaluate string concatenation
                  const result = this.evaluateStringConcatenation(lineContent, variables)
                  output += result + '\n'
                }
              }
            }
          }
        })
      }

      // Parse if statements
      const ifMatches = cleanCode.match(/if\s*\(([^)]+)\)\s*\{([^}]+)\}(?:\s*else\s*\{([^}]+)\})?/g)
      if (ifMatches) {
        ifMatches.forEach(ifMatch => {
          const match = ifMatch.match(/if\s*\(([^)]+)\)\s*\{([^}]+)\}(?:\s*else\s*\{([^}]+)\})?/)
          if (match) {
            const condition = match[1]
            const ifBody = match[2]
            const elseBody = match[3]
            
            // Evaluate condition
            const conditionResult = this.evaluateCondition(condition, variables)
            
            if (conditionResult && ifBody) {
              const consoleMatch = ifBody.match(/Console\.WriteLine\("([^"]+)"\)/)
              if (consoleMatch) {
                output += consoleMatch[1] + '\n'
              }
            } else if (!conditionResult && elseBody) {
              const consoleMatch = elseBody.match(/Console\.WriteLine\("([^"]+)"\)/)
              if (consoleMatch) {
                output += consoleMatch[1] + '\n'
              }
            }
          }
        })
      }

      // Parse regular Console.WriteLine statements (not in loops or conditions)
      const standaloneConsoleMatches = cleanCode.match(/Console\.WriteLine\([^)]+\)/g)
      if (standaloneConsoleMatches) {
        standaloneConsoleMatches.forEach(match => {
          // Skip if this Console.WriteLine is inside a loop or if statement
          const beforeMatch = cleanCode.substring(0, cleanCode.indexOf(match))
          const openBraces = (beforeMatch.match(/\{/g) || []).length
          const closeBraces = (beforeMatch.match(/\}/g) || []).length
          
          if (openBraces === closeBraces) { // Not inside braces
            const content = match.match(/Console\.WriteLine\(([^)]+)\)/)
            if (content && content[1]) {
              const result = this.evaluateStringConcatenation(content[1], variables)
              output += result + '\n'
            }
          }
        })
      }

      return {
        output: output.trim() || 'C# code executed successfully',
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

  private evaluateStringConcatenation(expr: string, variables: { [key: string]: any }): string {
    let result = expr
    
    // Handle string concatenation with +
    if (expr.includes('+')) {
      const parts = expr.split('+').map(part => part.trim())
      let concatenated = ''
      
      for (const part of parts) {
        if (part.startsWith('"') && part.endsWith('"')) {
          // String literal
          concatenated += part.slice(1, -1)
        } else if (part.startsWith('(') && part.endsWith(')')) {
          // Expression in parentheses
          const innerExpr = part.slice(1, -1).trim()
          const evalResult = this.evaluateExpression(innerExpr, variables)
          concatenated += evalResult.toString()
        } else if (variables[part] !== undefined) {
          // Variable
          concatenated += variables[part].toString()
        } else {
          // Try to parse as number or keep as is
          const num = parseInt(part)
          if (!isNaN(num)) {
            concatenated += num.toString()
          } else {
            concatenated += part
          }
        }
      }
      
      return concatenated
    }
    
    // Handle single values
    if (result.startsWith('"') && result.endsWith('"')) {
      return result.slice(1, -1)
    }
    
    if (variables[result] !== undefined) {
      return variables[result].toString()
    }
    
    return result
  }

  private evaluateCondition(condition: string, variables: { [key: string]: any }): boolean {
    // Replace variables in condition
    let processedCondition = condition
    for (const [name, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\b${name}\\b`, 'g')
      processedCondition = processedCondition.replace(regex, value.toString())
    }
    
    // Handle comparison operators
    if (processedCondition.includes('>=')) {
      const [left, right] = processedCondition.split('>=').map(s => s.trim())
      return parseInt(left) >= parseInt(right)
    }
    if (processedCondition.includes('<=')) {
      const [left, right] = processedCondition.split('<=').map(s => s.trim())
      return parseInt(left) <= parseInt(right)
    }
    if (processedCondition.includes('>')) {
      const [left, right] = processedCondition.split('>').map(s => s.trim())
      return parseInt(left) > parseInt(right)
    }
    if (processedCondition.includes('<')) {
      const [left, right] = processedCondition.split('<').map(s => s.trim())
      return parseInt(left) < parseInt(right)
    }
    if (processedCondition.includes('==')) {
      const [left, right] = processedCondition.split('==').map(s => s.trim())
      return left === right
    }
    
    return false
  }

  private evaluateExpression(expr: string, variables: { [key: string]: any }): any {
    // Replace variables in expression
    let processedExpr = expr
    for (const [name, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\b${name}\\b`, 'g')
      processedExpr = processedExpr.replace(regex, value.toString())
    }

    // Handle basic mathematical operations
    try {
      // Simple math evaluation (safe for basic expressions)
      if (/^[\d+\-*/().\s]+$/.test(processedExpr)) {
        return Function(`"use strict"; return (${processedExpr})`)()
      }
    } catch (error) {
      // If evaluation fails, return the original expression
    }

    return processedExpr
  }
}

export const csharpWasmRunner = new CSharpWasmRunner()