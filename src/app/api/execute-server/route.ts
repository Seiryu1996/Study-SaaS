import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { writeFileSync, unlinkSync, mkdtempSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

export async function POST(request: NextRequest) {
  try {
    const { language, code, input } = await request.json()

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      )
    }

    const result = await executeCode(language, code, input)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Server execution error:', error)
    return NextResponse.json(
      { 
        output: '', 
        error: error instanceof Error ? error.message : 'Execution failed',
        executionTime: 0
      },
      { status: 500 }
    )
  }
}

async function executeCode(language: string, code: string, input?: string) {
  const tempDir = mkdtempSync(join(tmpdir(), 'code-execution-'))
  const startTime = Date.now()

  // Security validations
  if (code.length > 10000) {
    return {
      output: '',
      error: 'Code length exceeds security limit',
      executionTime: Date.now() - startTime
    }
  }

  if (input && input.length > 1000) {
    return {
      output: '',
      error: 'Input length exceeds security limit', 
      executionTime: Date.now() - startTime
    }
  }

  // Check for dangerous patterns
  const dangerousPatterns = [
    /\.\.\//,  // Directory traversal
    /\/etc\//,
    /\/proc\//,
    /\/sys\//,
    /\/dev\//,
    /\/var\//,
    /\/usr\/bin/,
    /\/bin\//,
    /passwd/,
    /shadow/,
    /hosts/,
    /etc\/passwd/,
    /etc\/shadow/,
    /proc\/self/,
    /chmod\s+/,
    /chown\s+/,
    /sudo\s+/,
    /su\s+/,
    /rm\s+-rf/,
    /format\s+/,
    /mkfs\s+/,
    /dd\s+if=/,
    /cat\s+\/dev/,
    /nc\s+-/,
    /netcat/,
    /wget\s+http/,
    /curl\s+http/,
    /ping\s+-c/,
    /nmap\s+/,
    /ssh\s+/,
    /scp\s+/,
    /rsync\s+/
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return {
        output: '',
        error: 'Code contains potentially dangerous operations',
        executionTime: Date.now() - startTime
      }
    }
  }

  try {
    switch (language.toLowerCase()) {
      case 'go':
        return await executeGo(code, tempDir, input)
      case 'ruby':
        return await executeRuby(code, tempDir, input)
      case 'php':
        return await executePHP(code, tempDir, input)
      case 'csharp':
        return await executeCSharp(code, tempDir, input)
      case 'typescript':
      case 'ts':
        return await executeTypeScript(code, tempDir, input)
      case 'javascript':
      case 'js':
        return await executeJavaScript(code, tempDir, input)
      case 'html':
        // HTML syntax validation
        if (!code.trim()) {
          return {
            output: '',
            error: 'Empty HTML content',
            executionTime: Date.now() - startTime
          }
        }
        
        const errors = []
        
        // Check for unclosed tags
        const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
        const openTags = []
        const tagRegex = /<\/?(\w+)[^>]*>/g
        let match
        
        while ((match = tagRegex.exec(code)) !== null) {
          const tagName = match[1].toLowerCase()
          const isClosing = match[0].startsWith('</')
          const isSelfClosing = match[0].endsWith('/>')
          
          if (voidElements.includes(tagName)) {
            continue
          }
          
          if (isClosing) {
            const lastOpenTag = openTags.pop()
            if (lastOpenTag !== tagName) {
              errors.push(`Tag mismatch: expected </${lastOpenTag}>, found </${tagName}>`)
            }
          } else if (!isSelfClosing) {
            openTags.push(tagName)
          }
        }
        
        // Check for unclosed tags
        if (openTags.length > 0) {
          openTags.forEach(tag => {
            errors.push(`Unclosed tag: <${tag}>`)
          })
        }
        
        if (errors.length > 0) {
          return {
            output: '',
            error: errors.join('; '),
            executionTime: Date.now() - startTime
          }
        }
        
        return {
          output: 'HTML基本構造',
          executionTime: Date.now() - startTime,
          htmlPreview: true
        }
      case 'css':
        const sampleHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CSS Preview</title>
    <style>
        ${code}
    </style>
</head>
<body>
    <div class="container">
        <h1>見出し1</h1>
        <h2>見出し2</h2>
        <p>この段落はサンプルテキストです。</p>
        <div class="highlight">この段落にはhighlightクラスが適用されています。</div>
        <ul><li>リスト項目1</li><li>リスト項目2</li></ul>
        <button class="btn">ボタン</button>
    </div>
</body>
</html>`
        return {
          output: sampleHTML,
          executionTime: Date.now() - startTime,
          htmlPreview: true
        }
      default:
        return {
          output: '',
          error: `Language ${language} not supported for server execution`,
          executionTime: Date.now() - startTime
        }
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Execution failed',
      executionTime: Date.now() - startTime
    }
  } finally {
    // Cleanup temp directory
    try {
      execSync(`rm -rf "${tempDir}"`, { timeout: 5000 })
    } catch (e) {
      console.error('Failed to cleanup temp directory:', e)
    }
  }
}

async function executeGo(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  const fileName = join(tempDir, 'main.go')
  
  try {
    writeFileSync(fileName, code)
    
    // Check if Go is available
    try {
      execSync('which go', { timeout: 5000 })
    } catch {
      return {
        output: '',
        error: 'Go compiler not available on server. Please install Go to use server-side execution.',
        executionTime: Date.now() - startTime
      }
    }

    const output = execSync(`cd "${tempDir}" && go run main.go`, {
      timeout: 10000,
      encoding: 'utf8',
      input: input || ''
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.stderr || error.message || 'Go execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

async function executeRuby(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  const fileName = join(tempDir, 'script.rb')
  
  try {
    writeFileSync(fileName, code)
    
    try {
      execSync('which ruby', { timeout: 5000 })
    } catch {
      return {
        output: '',
        error: 'Ruby interpreter not available on server.',
        executionTime: Date.now() - startTime
      }
    }

    const output = execSync(`ruby "${fileName}"`, {
      timeout: 10000,
      encoding: 'utf8',
      input: input || ''
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.stderr || error.message || 'Ruby execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

async function executePHP(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  const fileName = join(tempDir, 'script.php')
  
  try {
    // Ensure PHP code starts with <?php
    let phpCode = code.trim()
    if (!phpCode.startsWith('<?php') && !phpCode.startsWith('<?=')) {
      phpCode = `<?php\n${phpCode}`
    }
    
    writeFileSync(fileName, phpCode)
    
    try {
      execSync('which php', { timeout: 5000 })
    } catch {
      return {
        output: '',
        error: 'PHP interpreter not available on server.',
        executionTime: Date.now() - startTime
      }
    }

    const output = execSync(`php "${fileName}"`, {
      timeout: 10000,
      encoding: 'utf8',
      input: input || '',
      stdio: ['pipe', 'pipe', 'pipe']
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    console.error('PHP execution error:', error)
    return {
      output: '',
      error: error.stderr || error.message || 'PHP execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

async function executeCSharp(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  
  try {
    // Check if dotnet is available
    try {
      execSync('which dotnet', { timeout: 5000 })
    } catch {
      // If .NET is not available, use a simple C# interpreter simulation
      return simulateCSharpExecution(code, startTime, input)
    }

    const fileName = join(tempDir, 'Program.cs')
    writeFileSync(fileName, code)

    // Create a minimal project file
    const projectFile = join(tempDir, 'temp.csproj')
    writeFileSync(projectFile, `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
</Project>`)

    const output = execSync(`cd "${tempDir}" && dotnet run`, {
      timeout: 15000,
      encoding: 'utf8',
      input: input || ''
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.stderr || error.message || 'C# execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

async function executeTypeScript(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  const fileName = join(tempDir, 'script.ts')
  const tsconfigFile = join(tempDir, 'tsconfig.json')
  
  try {
    // Create TypeScript configuration for CommonJS
    const tsconfig = {
      compilerOptions: {
        target: 'es2020',
        module: 'commonjs',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: false,
        skipLibCheck: true
      }
    }
    
    writeFileSync(fileName, code)
    writeFileSync(tsconfigFile, JSON.stringify(tsconfig, null, 2))
    
    // Execute TypeScript with project configuration
    const output = execSync(`npx ts-node --project "${tsconfigFile}" "${fileName}"`, {
      timeout: 10000,
      encoding: 'utf8',
      input: input || '',
      cwd: tempDir
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.stderr || error.message || 'TypeScript execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

async function executeJavaScript(code: string, tempDir: string, input?: string) {
  const startTime = Date.now()
  const fileName = join(tempDir, 'script.js')
  
  try {
    writeFileSync(fileName, code)

    const output = execSync(`node "${fileName}"`, {
      timeout: 10000,
      encoding: 'utf8',
      input: input || ''
    })

    return {
      output: output.toString(),
      executionTime: Date.now() - startTime
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.stderr || error.message || 'JavaScript execution failed',
      executionTime: Date.now() - startTime
    }
  }
}


function simulateCSharpExecution(code: string, startTime: number, input?: string) {
  try {
    let output = ''
    
    // Parse Console.WriteLine statements
    const consoleMatches = code.match(/Console\.WriteLine\([^)]+\)/g)
    if (consoleMatches) {
      consoleMatches.forEach(match => {
        const content = match.match(/Console\.WriteLine\(([^)]+)\)/)
        if (content && content[1]) {
          let line = content[1].trim()
          
          // Handle string literals
          if (line.startsWith('"') && line.endsWith('"')) {
            line = line.slice(1, -1)
          } else if (line.startsWith('$"') && line.endsWith('"')) {
            // Handle string interpolation
            line = line.slice(2, -1)
            
            // Extract variable declarations
            const variables: { [key: string]: string } = {}
            const varMatches = code.match(/(string|int)\s+(\w+)\s*=\s*[^;]+;/g)
            if (varMatches) {
              varMatches.forEach(varDecl => {
                const varMatch = varDecl.match(/(string|int)\s+(\w+)\s*=\s*([^;]+);/)
                if (varMatch) {
                  const varName = varMatch[2]
                  let varValue = varMatch[3].trim()
                  if (varValue.startsWith('"') && varValue.endsWith('"')) {
                    varValue = varValue.slice(1, -1)
                  }
                  variables[varName] = varValue
                }
              })
            }
            
            // Replace variables in interpolated string
            line = line.replace(/\{(\w+)\}/g, (match, varName) => {
              return variables[varName] || match
            })
          }
          
          output += line + '\n'
        }
      })
    }

    return {
      output: output.trim() || 'C# code executed successfully (simulated)',
      executionTime: Date.now() - startTime
    }
  } catch (error) {
    return {
      output: '',
      error: 'C# simulation failed',
      executionTime: Date.now() - startTime
    }
  }
}