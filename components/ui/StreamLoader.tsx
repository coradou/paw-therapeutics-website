'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface StreamLoadingContextType {
  isPageLoading: boolean
  completedSections: Set<string>
  registerSection: (sectionId: string) => void
  markSectionComplete: (sectionId: string) => void
  getSectionPriority: (sectionId: string) => 'high' | 'medium' | 'low'
}

const StreamLoadingContext = createContext<StreamLoadingContextType | null>(null)

export const useStreamLoading = () => {
  const context = useContext(StreamLoadingContext)
  if (!context) {
    throw new Error('useStreamLoading must be used within StreamLoadingProvider')
  }
  return context
}

interface StreamLoadingProviderProps {
  children: ReactNode
}

export const StreamLoadingProvider: React.FC<StreamLoadingProviderProps> = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [registeredSections, setRegisteredSections] = useState<Set<string>>(new Set())

  // 内容加载优先级配置
  const sectionPriorities: Record<string, 'high' | 'medium' | 'low'> = {
    hero: 'high',
    navbar: 'high',
    features: 'medium',
    about: 'medium',
    products: 'medium',
    team: 'low',
    contact: 'low',
    footer: 'low'
  }

  const registerSection = (sectionId: string) => {
    setRegisteredSections(prev => new Set(Array.from(prev).concat(sectionId)))
  }

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set(Array.from(prev).concat(sectionId)))
  }

  const getSectionPriority = (sectionId: string): 'high' | 'medium' | 'low' => {
    return sectionPriorities[sectionId] || 'medium'
  }

  // 页面加载完成检测
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 100) // 给组件初始化一些时间

    return () => clearTimeout(timer)
  }, [])

  // 监听关键资源加载完成
  useEffect(() => {
    const handleLoad = () => setIsPageLoading(false)
    const handleDOMContentLoaded = () => setIsPageLoading(false)

    if (document.readyState === 'complete') {
      setIsPageLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }
  }, [])

  const value: StreamLoadingContextType = {
    isPageLoading,
    completedSections,
    registerSection,
    markSectionComplete,
    getSectionPriority
  }

  return (
    <StreamLoadingContext.Provider value={value}>
      {children}
    </StreamLoadingContext.Provider>
  )
}

interface StreamSectionProps {
  sectionId: string
  children: ReactNode
  priority?: 'high' | 'medium' | 'low'
  loadingComponent?: ReactNode
  className?: string
}

export const StreamSection: React.FC<StreamSectionProps> = ({
  sectionId,
  children,
  priority,
  loadingComponent,
  className = ''
}) => {
  const { registerSection, markSectionComplete, getSectionPriority, isPageLoading } = useStreamLoading()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const sectionPriority = priority || getSectionPriority(sectionId)

  useEffect(() => {
    registerSection(sectionId)
  }, [sectionId, registerSection])

  useEffect(() => {
    if (!isPageLoading && !isLoaded) {
      // 根据优先级延迟加载
      const delays = {
        high: 0,
        medium: 300,
        low: 600
      }

      const timer = setTimeout(() => {
        setIsLoaded(true)
        markSectionComplete(sectionId)
        
        // 短暂延迟后显示内容，创建流式效果
        setTimeout(() => setShowContent(true), 100)
      }, delays[sectionPriority])

      return () => clearTimeout(timer)
    }
  }, [isPageLoading, isLoaded, sectionPriority, sectionId, markSectionComplete])

  if (!isLoaded) {
    return (
      <div className={`${className} loading-section priority-${sectionPriority}`}>
        {loadingComponent}
      </div>
    )
  }

  return (
    <div className={`${className} ${showContent ? 'fade-in-smooth' : 'opacity-0'}`}>
      {children}
    </div>
  )
}

// 智能预加载 Hook
export const usePreloader = () => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  
  const preloadImage = (src: string) => {
    if (preloadedImages.has(src)) return Promise.resolve()
    
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
             img.onload = () => {
         setPreloadedImages(prev => new Set(Array.from(prev).concat(src)))
         resolve()
       }
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = async (urls: string[]) => {
    const promises = urls.map(url => preloadImage(url))
    return Promise.all(promises)
  }

  return { preloadImage, preloadImages, isImagePreloaded: (src: string) => preloadedImages.has(src) }
}

export default StreamSection 