// Security validation service for code execution
export interface SecurityCheckResult {
  isValid: boolean
  error?: string
}

export interface CodeLimits {
  maxCodeLength: number
  maxInputLength: number
  timeoutMs: number
}

export class SecurityService {
  private static readonly CODE_LIMITS: Record<string, CodeLimits> = {
    javascript: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 10000 },
    typescript: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 15000 },
    python: { maxCodeLength: 8000, maxInputLength: 1000, timeoutMs: 30000 },
    html: { maxCodeLength: 10000, maxInputLength: 1000, timeoutMs: 5000 },
    css: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 5000 },
    go: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 15000 },
    csharp: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 15000 },
    ruby: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 15000 },
    php: { maxCodeLength: 5000, maxInputLength: 1000, timeoutMs: 15000 }
  }

  static getCodeLimits(language: string): CodeLimits {
    return this.CODE_LIMITS[language.toLowerCase()] || this.CODE_LIMITS.javascript
  }

  static validateCodeLength(code: string, language: string): SecurityCheckResult {
    const limits = this.getCodeLimits(language)
    
    if (code.length > limits.maxCodeLength) {
      return {
        isValid: false,
        error: `Code length (${code.length}) exceeds limit of ${limits.maxCodeLength} characters for ${language}`
      }
    }
    
    return { isValid: true }
  }

  static validateInputLength(input: string | undefined, language: string): SecurityCheckResult {
    if (!input) return { isValid: true }
    
    const limits = this.getCodeLimits(language)
    
    if (input.length > limits.maxInputLength) {
      return {
        isValid: false,
        error: `Input length (${input.length}) exceeds limit of ${limits.maxInputLength} characters`
      }
    }
    
    return { isValid: true }
  }

  static checkDangerousPatterns(code: string, language: string): SecurityCheckResult {
    const patterns = this.getDangerousPatterns(language)
    
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        return {
          isValid: false,
          error: 'Code contains potentially dangerous operations'
        }
      }
    }
    
    return { isValid: true }
  }

  private static getDangerousPatterns(language: string): RegExp[] {
    const commonJSPatterns = [
      /fetch\s*\(/,
      /XMLHttpRequest/,
      /eval\s*\(/,
      /Function\s*\(/,
      /setTimeout\s*\(/,
      /setInterval\s*\(/,
      /process\./,
      /global\./,
      /window\./,
      /document\./,
      /location\./,
      /navigator\./,
      /history\./,
      /localStorage/,
      /sessionStorage/,
      /indexedDB/,
      /crypto\./,
      /worker/i,
      /websocket/i,
      /webrtc/i,
      /geolocation/i,
      /notification/i,
      /alert\s*\(/,
      /confirm\s*\(/,
      /prompt\s*\(/,
      /__proto__/,
      /constructor\.prototype/,
      /\.prototype\.constructor/
    ]

    const maliciousUrlPatterns = [
      /file:\/\//,
      /data:text\/html/,
      /javascript:/,
      /vbscript:/
    ]

    const normalizedLang = language.toLowerCase();

    switch (normalizedLang) {
      case 'javascript':
      case 'typescript':
        return [
          ...commonJSPatterns,
          ...maliciousUrlPatterns,
          /require\s*\(/,
          /import\s+.*from/,
          /module\.exports/,
          /exports\./,
          /__dirname/,
          /__filename/,
          /Buffer\./,
          /stream\./
        ]
      
      case 'css':
        return [
          /javascript:/i,
          /vbscript:/i,
          /expression\s*\(/i,
          /behavior\s*:/i,
          /-moz-binding/i,
          /\@import.*javascript/i,
          /\@import.*vbscript/i
        ]
      
      case 'html':
        return [
          /javascript:/i,
          /vbscript:/i,
          /<script[^>]*>/i,
          /<iframe[^>]*srcdoc/i,
          /<object[^>]*>/i,
          /<embed[^>]*>/i,
          /<applet[^>]*>/i,
          /<meta[^>]*http-equiv.*refresh/i,
          /\son\w+\s*=/i  // Event handlers like onclick, onload (with space before)
        ]
      
      case 'go':
      case 'csharp':
      case 'cs':
      case 'ruby':
      case 'rb':
      case 'php':
        return [
          /exec\s*\(/,
          /system\s*\(/,
          /shell_exec/,
          /file_get_contents/,
          /file_put_contents/,
          /fopen\s*\(/,
          /fsockopen/,
          /curl_exec/,
          /wget\s+/,
          /rm\s+/,
          /chmod\s+/,
          /chown\s+/,
          /\.\.\//,
          /\/etc\//,
          /\/proc\//,
          /\/sys\//,
          /\/dev\//,
          /passwd/,
          /shadow/
        ]
      
      default:
        return []
    }
  }

  static validateAll(code: string, input: string | undefined, language: string): SecurityCheckResult {
    // For CSS and HTML, only do basic length validation
    if (language.toLowerCase() === 'css' || language.toLowerCase() === 'html') {
      const codeLengthCheck = this.validateCodeLength(code, language)
      if (!codeLengthCheck.isValid) return codeLengthCheck

      const inputLengthCheck = this.validateInputLength(input, language)
      if (!inputLengthCheck.isValid) return inputLengthCheck

      return { isValid: true }
    }

    const codeLengthCheck = this.validateCodeLength(code, language)
    if (!codeLengthCheck.isValid) return codeLengthCheck

    const inputLengthCheck = this.validateInputLength(input, language)
    if (!inputLengthCheck.isValid) return inputLengthCheck

    const dangerousPatternCheck = this.checkDangerousPatterns(code, language)
    if (!dangerousPatternCheck.isValid) return dangerousPatternCheck

    return { isValid: true }
  }
}