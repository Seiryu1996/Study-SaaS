// Main code execution service with separated concerns
import { SecurityService } from './SecurityService'
import { HtmlSanitizerService } from './HtmlSanitizerService'
import { LanguageInfoService } from './LanguageInfoService'

export interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
  htmlPreview?: boolean
  needsClientExecution?: boolean
  clientCode?: string
  clientInput?: string
}

export interface ExecutionRequest {
  code: string
  language: string
  input?: string
}

export class CodeExecutionService {
  // JavaScript execution using controlled sandbox
  private static executeJavaScript(code: string, input?: string): ExecutionResult {
    const startTime = Date.now()
    let output = ''
    let error = ''

    const logs: string[] = []
    
    const sandboxConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '))
      }
    }

    try {
      const sandbox = {
        console: sandboxConsole,
        input: input || '',
        Math,
        Array,
        Object,
        String,
        Number,
        Boolean,
        Date: () => new Date(),
        JSON,
        parseInt,
        parseFloat,
        isNaN,
        isFinite
      }

      const func = new Function(
        ...Object.keys(sandbox),
        `"use strict"; ${code}`
      )
      
      func(...Object.values(sandbox))
      output = logs.join('\n')
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error'
    }

    return {
      output: output || 'No output',
      error,
      executionTime: Date.now() - startTime
    }
  }

  // TypeScript execution - transpile to JavaScript
  private static executeTypeScript(code: string, input?: string): ExecutionResult {
    const startTime = Date.now()
    
    try {
      let jsCode = code
        .replace(/interface\s+\w+\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g, '')
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
        .replace(/(let|const|var)\s+(\w+)\s*:\s*[\w\[\]|<>]+/g, '$1 $2')
        .replace(/(\w+)\s*:\s*[\w\[\]|<>]+(?=\s*[,)])/g, '$1')
        .replace(/\)\s*:\s*[\w\[\]|<>]+(?=\s*\{)/g, ') ')
        .replace(/<[\w,\s]+>/g, '')
        .replace(/\s+as\s+[\w\[\]|<>]+/g, '')
        .replace(/export\s+/g, '')
        .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '')
        .replace(/\s+/g, ' ')
        .trim()

      return CodeExecutionService.executeJavaScript(jsCode, input)
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'TypeScript transpilation error',
        executionTime: Date.now() - startTime
      }
    }
  }

  // CSS execution with sample HTML
  private static executeCSS(code: string): ExecutionResult {
    const startTime = Date.now()
    
    try {
      const sampleHTML = `
<!DOCTYPE html>
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
        <p>この段落はサンプルテキストです。CSSスタイルが適用されているかを確認できます。</p>
        <p class="highlight">この段落にはhighlightクラスが適用されています。</p>
        <div id="special">このdivにはspecialというIDが設定されています。</div>
        <ul>
            <li>リスト項目1</li>
            <li>リスト項目2</li>
            <li>リスト項目3</li>
        </ul>
        <button class="btn">ボタン</button>
        <div class="card">
            <h3>カードタイトル</h3>
            <p>カードの内容です。</p>
        </div>
    </div>
</body>
</html>`

      return {
        output: sampleHTML,
        executionTime: Date.now() - startTime,
        htmlPreview: true
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'CSS processing error',
        executionTime: Date.now() - startTime
      }
    }
  }

  // HTML execution with sanitization
  private static executeHTML(code: string): ExecutionResult {
    const startTime = Date.now()
    
    try {
      const sanitizedCode = HtmlSanitizerService.createSafePreview(code)
      
      return {
        output: sanitizedCode,
        executionTime: Date.now() - startTime,
        htmlPreview: true
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'HTML parsing error',
        executionTime: Date.now() - startTime
      }
    }
  }

  // Redirect to client-side execution
  private static redirectToClientExecution(language: string, code: string, input?: string): ExecutionResult {
    const info = LanguageInfoService.getLanguageInfo(language)
    const languageName = info?.name || language
    
    return {
      output: '',
      error: `${languageName} execution should be handled client-side`,
      executionTime: 0,
      needsClientExecution: true,
      clientCode: code,
      clientInput: input
    }
  }

  // Main execution method
  static async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const { code, language, input } = request

    // Basic validation
    if (!code.trim()) {
      return {
        output: '',
        error: 'No code provided',
        executionTime: 0
      }
    }

    // Security validation
    const securityCheck = SecurityService.validateAll(code, input, language)
    if (!securityCheck.isValid) {
      return {
        output: '',
        error: securityCheck.error!,
        executionTime: 0
      }
    }

    // Language support check
    if (!LanguageInfoService.isSupported(language)) {
      return {
        output: '',
        error: `Language "${language}" is not supported`,
        executionTime: 0
      }
    }

    try {
      const normalizedLang = LanguageInfoService.normalizeLanguageName(language)
      
      switch (normalizedLang) {
        case 'javascript':
          return CodeExecutionService.executeJavaScript(code, input)
        
        case 'typescript':
          return CodeExecutionService.executeTypeScript(code, input)
        
        case 'html':
          return CodeExecutionService.executeHTML(code)
        
        case 'css':
          return CodeExecutionService.executeCSS(code)
        
        case 'python':
        case 'go':
        case 'csharp':
        case 'ruby':
        case 'php':
          return CodeExecutionService.redirectToClientExecution(normalizedLang, code, input)
        
        default:
          return {
            output: '',
            error: `Execution for "${language}" is not implemented yet`,
            executionTime: 0
          }
      }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Execution failed',
        executionTime: 0
      }
    }
  }
}