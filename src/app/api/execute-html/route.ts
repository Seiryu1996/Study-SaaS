import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ error: 'Code required' }, { status: 400 })
    }

    // Simple HTML cleanup
    const cleanHTML = code
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')

    const fullHTML = `<!DOCTYPE html>
<html>
<head><title>Preview</title></head>
<body>${cleanHTML}</body>
</html>`

    return NextResponse.json({
      output: fullHTML,
      executionTime: Date.now() - startTime,
      htmlPreview: true
    })
  } catch (err: any) {
    return NextResponse.json({
      output: '',
      error: err.message || 'Error',
      executionTime: Date.now() - startTime
    })
  }
}