import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { writeFileSync, mkdtempSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, language, input } = body

    // Validate request
    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      )
    }

    // Simple execution logic
    const startTime = Date.now()
    
    switch (language.toLowerCase()) {
      case 'javascript':
        try {
          const logs: string[] = []
          const sandboxConsole = {
            log: (...args: any[]) => {
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' '))
            }
          }

          const func = new Function('console', `"use strict"; ${code}`)
          func(sandboxConsole)
          
          return NextResponse.json({
            output: logs.join('\n') || 'No output',
            executionTime: Date.now() - startTime
          })
        } catch (err) {
          return NextResponse.json({
            output: '',
            error: err instanceof Error ? err.message : 'Unknown error',
            executionTime: Date.now() - startTime
          })
        }

      case 'typescript':
        try {
          const tempDir = mkdtempSync(join(tmpdir(), 'code-execution-'))
          const fileName = join(tempDir, 'script.ts')
          const tsconfigFile = join(tempDir, 'tsconfig.json')
          
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
          
          const output = execSync(`npx ts-node --project "${tsconfigFile}" "${fileName}"`, {
            timeout: 10000,
            encoding: 'utf8',
            input: input || '',
            cwd: tempDir
          })

          execSync(`rm -rf "${tempDir}"`, { timeout: 5000 })

          return NextResponse.json({
            output: output.toString(),
            executionTime: Date.now() - startTime
          })
        } catch (error: any) {
          return NextResponse.json({
            output: '',
            error: error.stderr || error.message || 'TypeScript execution failed',
            executionTime: Date.now() - startTime
          })
        }

      case 'css':
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

        return NextResponse.json({
          output: sampleHTML,
          executionTime: Date.now() - startTime,
          htmlPreview: true
        })

      case 'html':
        try {
          // HTML validation and sanitization
          const htmlErrors = []
          
          // Basic HTML syntax validation
          if (!code.trim()) {
            htmlErrors.push('Empty HTML content')
          }
          
          // Check for unclosed tags
          const openTags = code.match(/<(\w+)(?:\s[^>]*)?>(?![^<]*<\/\1>)/g)
          const closeTags = code.match(/<\/(\w+)>/g)
          
          if (openTags && closeTags) {
            const openTagNames = openTags.map(tag => tag.match(/<(\w+)/)?.[1]).filter(Boolean)
            const closeTagNames = closeTags.map(tag => tag.match(/<\/(\w+)>/)?.[1]).filter(Boolean)
            
            openTagNames.forEach(tagName => {
              if (!['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName.toLowerCase())) {
                if (!closeTagNames.includes(tagName)) {
                  htmlErrors.push(`Unclosed tag: <${tagName}>`)
                }
              }
            })
          }
          
          // Basic security check - remove dangerous content
          const dangerousPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi
          ]
          
          let sanitizedCode = code
          dangerousPatterns.forEach(pattern => {
            if (pattern.test(code)) {
              htmlErrors.push('Potentially unsafe content detected and removed')
              sanitizedCode = sanitizedCode.replace(pattern, '')
            }
          })
          
          // Wrap in basic HTML structure if not present
          if (!code.toLowerCase().includes('<!doctype') && !code.toLowerCase().includes('<html')) {
            sanitizedCode = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
</head>
<body>
    ${sanitizedCode}
</body>
</html>`
          }
          
          return NextResponse.json({
            output: sanitizedCode,
            executionTime: Date.now() - startTime,
            htmlPreview: true,
            warnings: htmlErrors.length > 0 ? htmlErrors : undefined
          })
        } catch (err) {
          return NextResponse.json({
            output: '',
            error: err instanceof Error ? err.message : 'HTML processing failed',
            executionTime: Date.now() - startTime
          })
        }

      default:
        return NextResponse.json({
          output: '',
          error: `Language "${language}" execution should be handled client-side`,
          executionTime: Date.now() - startTime,
          needsClientExecution: true,
          clientCode: code,
          clientInput: input
        })
    }
  } catch (error) {
    console.error('Code execution error:', error)
    return NextResponse.json(
      { 
        output: '',
        error: 'Internal server error',
        executionTime: 0
      },
      { status: 500 }
    )
  }
}