'use client'

import { LanguageInfoService } from '@/lib/execution/services/LanguageInfoService'

interface LanguageInfoProps {
  language: string
  className?: string
  showDetails?: boolean
}

export default function LanguageInfo({ language, className = '', showDetails = false }: LanguageInfoProps) {
  const info = LanguageInfoService.getLanguageInfo(language)
  
  if (!info) {
    return (
      <div className={`text-red-600 dark:text-red-400 text-sm ${className}`}>
        Unsupported language: {language}
      </div>
    )
  }

  const getExecutionTypeIcon = () => {
    switch (info.executionType) {
      case 'client': return '🌐'
      case 'server': return '🖥️'
      case 'hybrid': return '🔄'
      default: return '❓'
    }
  }

  const getExecutionTypeColor = () => {
    switch (info.executionType) {
      case 'client': return 'text-green-600 dark:text-green-400'
      case 'server': return 'text-blue-600 dark:text-blue-400'
      case 'hybrid': return 'text-purple-600 dark:text-purple-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  if (!showDetails) {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {info.name}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {info.version}
        </span>
        <span className={`${getExecutionTypeColor()}`}>
          {getExecutionTypeIcon()}
        </span>
      </div>
    )
  }

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {info.name}
          </h3>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
            {info.version}
          </span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${getExecutionTypeColor()}`}>
          <span>{getExecutionTypeIcon()}</span>
          <span className="capitalize">{info.executionType}</span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {info.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Runtime:</span>
          <span className="text-gray-600 dark:text-gray-400">{info.runtime}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Extension:</span>
          <span className="font-mono text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            {info.fileExtension}
          </span>
        </div>
      </div>

      {info.features.length > 0 && (
        <div className="space-y-2">
          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">Features:</span>
          <div className="flex flex-wrap gap-1">
            {info.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}