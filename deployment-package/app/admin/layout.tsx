import '../globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { I18nProvider } from '../../lib/i18n'
import PerformanceMonitor from '../../components/ui/PerformanceMonitor'

export const metadata: Metadata = {
  title: '后台管理系统 | 爪子制药',
  description: '爪子制药简历管理后台系统',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
      <PerformanceMonitor />
    </I18nProvider>
  )
} 