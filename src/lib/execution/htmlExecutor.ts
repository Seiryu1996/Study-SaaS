// HTML execution and sanitization service
export function executeHTML(code: string) {
  const startTime = Date.now()
  
  try {
    // Comprehensive HTML sanitization
    let sanitizedHTML = code
      // Remove script tags and content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      // Remove event handlers (onclick, onload, etc.)
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      // Remove javascript: URLs
      .replace(/javascript:/gi, 'removed:')
      // Remove vbscript: URLs
      .replace(/vbscript:/gi, 'removed:')
      // Remove data URLs with HTML content
      .replace(/data:text\/html/gi, 'data:text/plain')
      // Remove dangerous tags
      .replace(/<(object|embed|applet|iframe)[^>]*>[\s\S]*?<\/\1>/gi, '')
      // Remove form elements that could be dangerous
      .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
      // Remove meta refresh redirects
      .replace(/<meta[^>]*http-equiv\s*=\s*["']refresh["'][^>]*>/gi, '')

    // Ensure basic HTML structure if missing
    if (!sanitizedHTML.includes('<html>') && !sanitizedHTML.includes('<!DOCTYPE')) {
      sanitizedHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
    </style>
</head>
<body>
    ${sanitizedHTML}
</body>
</html>`
    }

    return {
      output: sanitizedHTML,
      executionTime: Date.now() - startTime,
      htmlPreview: true
    }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'HTML processing failed',
      executionTime: Date.now() - startTime
    }
  }
}