'use client'

import Link from 'next/link'
import { useI18n } from '../lib/i18n'

export default function NotFound() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-paw-light to-white">
      <div className="text-center space-y-6 p-8">
        <div className="relative">
          {/* Animated paw print */}
          <div className="w-32 h-32 mx-auto mb-8">
            <svg className="w-full h-full text-paw-primary animate-bounce" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">{t.notFound.title}</h2>
          <p className="text-gray-500 mb-8">
            {t.notFound.message}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            {t.notFound.backHome}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t.notFound.contactUs}
          </Link>
        </div>
        
        {/* Fun pet animation text */}
        <p className="text-sm text-gray-400 mt-8">
          {t.notFound.funMessage}
        </p>
      </div>
    </div>
  )
} 