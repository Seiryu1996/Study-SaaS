// Language information and version details service
export interface LanguageInfo {
  name: string
  version: string
  runtime: string
  description: string
  fileExtension: string
  executionType: 'client' | 'server' | 'hybrid'
  features: string[]
}

export class LanguageInfoService {
  private static readonly LANGUAGE_INFO: Record<string, LanguageInfo> = {
    javascript: {
      name: 'JavaScript',
      version: 'ES2020 (ECMAScript 2020)',
      runtime: 'Browser (V8 Engine 12.4+)',
      description: 'モダンJavaScript、クライアントサイド実行',
      fileExtension: '.js',
      executionType: 'client',
      features: ['ES6+', 'Arrow Functions', 'Async/Await', 'Classes']
    },
    typescript: {
      name: 'TypeScript',
      version: '5.3.3',
      runtime: 'ts-node 10.9.2 + Node.js 18.19.0',
      description: 'TypeScript、型安全なJavaScript',
      fileExtension: '.ts',
      executionType: 'server',
      features: ['Static Typing', 'Interfaces', 'Generics', 'ES6+']
    },
    python: {
      name: 'Python',
      version: '3.11.6',
      runtime: 'Pyodide 0.24.1 (WebAssembly)',
      description: 'Python、科学計算ライブラリ対応',
      fileExtension: '.py',
      executionType: 'client',
      features: ['NumPy', 'Pandas', 'Matplotlib', 'Standard Library']
    },
    go: {
      name: 'Go',
      version: '1.21.0',
      runtime: 'Go Compiler 1.21.0',
      description: 'Go言語、高速コンパイル',
      fileExtension: '.go',
      executionType: 'server',
      features: ['Goroutines', 'Channels', 'Fast Compilation', 'Standard Library']
    },
    csharp: {
      name: 'C#',
      version: '.NET 6.0.428',
      runtime: '.NET SDK 6.0.428',
      description: 'C# .NET、オブジェクト指向',
      fileExtension: '.cs',
      executionType: 'server',
      features: ['LINQ', 'Async/Await', 'Generics', '.NET Libraries']
    },
    ruby: {
      name: 'Ruby',
      version: '3.0.6',
      runtime: 'Ruby MRI 3.0.6',
      description: 'Ruby、シンプルで表現力豊か',
      fileExtension: '.rb',
      executionType: 'server',
      features: ['Metaprogramming', 'Blocks', 'Dynamic Typing', 'Standard Library']
    },
    php: {
      name: 'PHP',
      version: '8.2.12',
      runtime: 'PHP CLI 8.2.12',
      description: 'PHP、Web開発向け',
      fileExtension: '.php',
      executionType: 'server',
      features: ['Web Development', 'Dynamic Typing', 'Built-in Functions', 'OOP']
    },
    html: {
      name: 'HTML',
      version: 'HTML 5.3',
      runtime: 'Browser Engine (Chromium)',
      description: 'HTML5、マークアップ言語',
      fileExtension: '.html',
      executionType: 'client',
      features: ['Semantic Elements', 'Forms', 'Media', 'Canvas']
    },
    css: {
      name: 'CSS',
      version: 'CSS 3.0 (Level 4 modules)',
      runtime: 'Browser Engine (Chromium)',
      description: 'CSS3、スタイルシート',
      fileExtension: '.css',
      executionType: 'client',
      features: ['Flexbox', 'Grid', 'Animations', 'Media Queries']
    }
  }

  static getLanguageInfo(language: string): LanguageInfo | null {
    const normalizedLang = this.normalizeLanguageName(language)
    return this.LANGUAGE_INFO[normalizedLang] || null
  }

  static getAllLanguages(): LanguageInfo[] {
    return Object.values(this.LANGUAGE_INFO)
  }

  static getSupportedLanguages(): string[] {
    return Object.keys(this.LANGUAGE_INFO)
  }

  static getLanguageVersion(language: string): string {
    const info = this.getLanguageInfo(language)
    return info ? `${info.name} ${info.version}` : 'Unknown'
  }

  static getExecutionInfo(language: string): string {
    const info = this.getLanguageInfo(language)
    if (!info) return 'Not supported'
    
    return `${info.runtime} (${info.executionType}-side)`
  }

  static normalizeLanguageName(language: string): string {
    const normalizedMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'cs': 'csharp',
      'rb': 'ruby'
    }
    
    const lower = language.toLowerCase()
    return normalizedMap[lower] || lower
  }

  static isSupported(language: string): boolean {
    const normalizedLang = this.normalizeLanguageName(language)
    return normalizedLang in this.LANGUAGE_INFO
  }

  static getFileExtension(language: string): string {
    const info = this.getLanguageInfo(language)
    return info?.fileExtension || '.txt'
  }
}