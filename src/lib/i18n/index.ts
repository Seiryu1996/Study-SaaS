'use client'

import { translations, type Language, type Translation } from './translations'

// Default language
export const DEFAULT_LANGUAGE: Language = 'ja' // Changed to Japanese as default

// Get browser language preference
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ja')) return 'ja'
  return 'en'
}

// Get current language from localStorage or browser
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  
  const savedLang = localStorage.getItem('language') as Language
  if (savedLang && (savedLang === 'en' || savedLang === 'ja')) {
    return savedLang
  }
  
  return getBrowserLanguage()
}

// Set language preference
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('language', lang)
}

// Translation function with interpolation support
export function t(key: keyof Translation, params?: Record<string, string | number>): string {
  const lang = getCurrentLanguage()
  let translation = translations[lang][key] || translations[DEFAULT_LANGUAGE][key] || key
  
  // Simple interpolation
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      translation = translation.replace(`{${paramKey}}`, String(value))
    })
  }
  
  return translation
}

// Hook for React components
import { useState, useEffect } from 'react'

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANGUAGE)
  
  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])
  
  const switchLanguage = (lang: Language) => {
    setLanguage(lang)
    setCurrentLang(lang)
    // Reload page to apply language changes
    window.location.reload()
  }
  
  return {
    t: (key: keyof Translation, params?: Record<string, string | number>) => {
      const lang = currentLang
      let translation = translations[lang][key] || translations[DEFAULT_LANGUAGE][key] || key
      
      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          translation = translation.replace(`{${paramKey}}`, String(value))
        })
      }
      
      return translation
    },
    currentLanguage: currentLang,
    switchLanguage,
    languages: [
      { code: 'ja' as Language, name: '日本語' },
      { code: 'en' as Language, name: 'English' }
    ]
  }
}