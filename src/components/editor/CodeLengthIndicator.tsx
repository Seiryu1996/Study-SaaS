'use client'

import { SecurityService } from '@/lib/execution/services/SecurityService'

interface CodeLengthIndicatorProps {
  code: string
  language: string
  className?: string
}

export default function CodeLengthIndicator({ code, language, className = '' }: CodeLengthIndicatorProps) {
  const limits = SecurityService.getCodeLimits(language)
  const currentLength = code.length
  const maxLength = limits.maxCodeLength
  const percentage = (currentLength / maxLength) * 100
  
  const getColorClasses = () => {
    if (percentage >= 100) return 'text-red-600 dark:text-red-400'
    if (percentage >= 90) return 'text-orange-600 dark:text-orange-400' 
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const getProgressBarColor = () => {
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 90) return 'bg-orange-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 dark:text-gray-300">
          Code Length
        </span>
        <span className={`font-mono ${getColorClasses()}`}>
          {currentLength.toLocaleString()} / {maxLength.toLocaleString()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {percentage >= 90 && (
        <div className={`text-xs ${getColorClasses()}`}>
          {percentage >= 100 ? (
            <span className="flex items-center gap-1">
              <span className="text-red-500">⚠️</span>
              Character limit exceeded
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span className="text-orange-500">⚠️</span>
              Approaching character limit
            </span>
          )}
        </div>
      )}
    </div>
  )
}