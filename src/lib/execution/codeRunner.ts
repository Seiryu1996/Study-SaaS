// Re-export from the new service structure
export { 
  CodeExecutionService as CodeRunner,
  type ExecutionResult,
  type ExecutionRequest 
} from './services/CodeExecutionService'

export { SecurityService } from './services/SecurityService'
export { HtmlSanitizerService } from './services/HtmlSanitizerService'  
export { LanguageInfoService } from './services/LanguageInfoService'

// Import for legacy export
import { CodeExecutionService } from './services/CodeExecutionService'

// Legacy export for backward compatibility
export const codeRunner = {
  execute: CodeExecutionService.execute
}

