'use client'

import { useEffect, useState } from 'react'

interface PerformanceData {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceData>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
        }
      }
    })
    paintObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }))
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      setMetrics(prev => ({ ...prev, ttfb: Math.round(navigationEntry.responseStart - navigationEntry.requestStart) }))
    }

    return () => {
      paintObserver.disconnect()
      lcpObserver.disconnect()
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        title="性能监控"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-xs">
          <h3 className="text-sm font-bold mb-2">性能指标</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={metrics.fcp && metrics.fcp < 1800 ? 'text-green-400' : 'text-yellow-400'}>
                {metrics.fcp ? `${metrics.fcp}ms` : '测量中...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={metrics.lcp && metrics.lcp < 2500 ? 'text-green-400' : 'text-yellow-400'}>
                {metrics.lcp ? `${metrics.lcp}ms` : '测量中...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span className={metrics.ttfb && metrics.ttfb < 800 ? 'text-green-400' : 'text-yellow-400'}>
                {metrics.ttfb ? `${metrics.ttfb}ms` : '测量中...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 