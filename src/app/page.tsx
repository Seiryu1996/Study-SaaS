'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import { useTranslation } from '@/lib/i18n'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('home.title')}
            <span className="block text-blue-600">{t('home.subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/lessons" 
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              {t('home.startLearning')}
            </Link>
            <Link 
              href="/editor" 
              className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              {t('home.tryEditor')}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-700/30">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('home.feature1.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.feature1.description')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-700/30">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('home.feature2.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.feature2.description')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-700/30">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('home.feature3.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.feature3.description')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}