'use client'

import Link from 'next/link'
import { UserButton, useUser, SignInButton } from '@clerk/nextjs'
import { useTranslation } from '@/lib/i18n'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header() {
  const { isSignedIn, user } = useUser()
  const { t, switchLanguage, currentLanguage, languages } = useTranslation()

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              📚 Study SaaS
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/lessons" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {t('nav.lessons')}
              </Link>
              <Link 
                href="/editor" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {t('nav.editor')}
              </Link>
              {isSignedIn && (
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle - Temporarily disabled */}
            {/* <ThemeToggle /> */}
            
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => switchLanguage(e.target.value as any)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {t('nav.welcome', { name: user.firstName || t('common.user') })}
                </span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-lg border border-gray-200",
                      userButtonPopoverActions__signOut: "text-red-600 hover:text-red-700"
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    {t('nav.signIn')}
                  </button>
                </SignInButton>
                <Link
                  href="/sign-up"
                  className="btn-primary"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}