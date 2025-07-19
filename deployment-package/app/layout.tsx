import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { I18nProvider } from '../lib/i18n'
import PerformanceMonitor from '../components/ui/PerformanceMonitor'
import Navbar from '../components/layout/Navbar'

// Default metadata - will be overridden by generateMetadata in specific pages if needed
export const metadata: Metadata = {
  metadataBase: new URL('https://pawmed.com'),
  title: {
    default: 'PAW Therapeutics | AI-Driven Cross-Species Longevity Drug Discovery Platform',
    template: '%s | PAW Therapeutics'
  },
  description: 'Leveraging artificial intelligence technology to accelerate anti-aging drug development for pets and humans, enabling every life to enjoy longer, healthier companionship.',
  keywords: ['PAW Therapeutics', 'AI Pharmaceuticals', 'Pet Longevity', 'Anti-aging Drugs', 'Methylation Detection', 'Cross-species Medicine', 'Drug Discovery', 'Canine Therapy', 'Life Extension'],
  authors: [{ name: 'PAW Therapeutics' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'PAW Therapeutics | AI-Driven Cross-Species Longevity Drug Discovery Platform',
    description: 'Leveraging AI technology to accelerate anti-aging drug development for pets and humans',
    url: 'https://pawmed.com',
    siteName: 'PAW Therapeutics',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAW Therapeutics | AI-Driven Cross-Species Longevity Drug Discovery Platform',
    description: 'Leveraging AI technology to accelerate anti-aging drug development for pets and humans',
  },
  alternates: {
    languages: {
      'zh-CN': '/zh',
      'en-US': '/en',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Dynamic language and metadata will be handled by the I18nProvider */}
      </head>
      <body className={`font-sans`}>
        <I18nProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <PerformanceMonitor />
        </I18nProvider>
      </body>
    </html>
  )
}