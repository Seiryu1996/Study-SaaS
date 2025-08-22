// HTML sanitization service for safe preview rendering
export class HtmlSanitizerService {
  static sanitizeHtml(html: string): string {
    return html
      // Remove script tags completely
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<\/script>/gi, '')
      
      // Remove style tags with JavaScript
      .replace(/<style[^>]*>[\s\S]*?expression\s*\([\s\S]*?<\/style>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?javascript:[\s\S]*?<\/style>/gi, '')
      
      // Remove dangerous event handlers
      .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\bon\w+\s*=\s*[^>\s]+/gi, '')
      
      // Remove dangerous protocols
      .replace(/javascript:/gi, 'blocked:')
      .replace(/vbscript:/gi, 'blocked:')
      .replace(/data:text\/html/gi, 'blocked:')
      .replace(/data:application/gi, 'blocked:')
      
      // Block dangerous tags
      .replace(/<iframe/gi, '<div data-blocked="iframe"')
      .replace(/<\/iframe>/gi, '</div>')
      .replace(/<object/gi, '<div data-blocked="object"')
      .replace(/<\/object>/gi, '</div>')
      .replace(/<embed/gi, '<div data-blocked="embed"')
      .replace(/<\/embed>/gi, '</div>')
      .replace(/<form/gi, '<div data-blocked="form"')
      .replace(/<\/form>/gi, '</div>')
      .replace(/<input/gi, '<div data-blocked="input"')
      .replace(/<textarea/gi, '<div data-blocked="textarea"')
      .replace(/<\/textarea>/gi, '</div>')
      .replace(/<button/gi, '<div data-blocked="button"')
      .replace(/<\/button>/gi, '</div>')
      .replace(/<select/gi, '<div data-blocked="select"')
      .replace(/<\/select>/gi, '</div>')
      .replace(/<option/gi, '<div data-blocked="option"')
      .replace(/<\/option>/gi, '</div>')
      
      // Remove dangerous attributes
      .replace(/\s(src|href|action|formaction|background|cite|classid|codebase|data|datasrc|dynsrc|lowsrc)\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s(src|href|action|formaction|background|cite|classid|codebase|data|datasrc|dynsrc|lowsrc)\s*=\s*[^>\s]+/gi, '')
      
      // Remove meta refresh and other dangerous meta tags
      .replace(/<meta[^>]*http-equiv[^>]*>/gi, '')
      .replace(/<meta[^>]*refresh[^>]*>/gi, '')
      
      // Limit nested depth to prevent parser bombs
      .replace(/(<[^>]+>)\1{10,}/gi, '$1<!-- Repeated tags removed for security -->')
  }

  static createSafePreview(html: string): string {
    const sanitized = this.sanitizeHtml(html)
    
    // Wrap in safe container with CSP
    return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: https:;">
    <title>Safe Preview</title>
</head>
<body>
    ${sanitized}
</body>
</html>`
  }
}