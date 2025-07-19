'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  lowQualitySrc?: string
  placeholder?: 'blur' | 'skeleton' | 'shimmer'
  onLoad?: () => void
}

export default function ProgressiveImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  lowQualitySrc,
  placeholder = 'skeleton',
  onLoad,
}: ProgressiveImageProps) {
  const [loadingState, setLoadingState] = useState<'loading' | 'low-quality' | 'high-quality'>('loading')
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer 懒加载
  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // 提前50px开始加载
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // 生成低质量图片URL（如果没有提供）
  const generateLowQualityUrl = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&w=50&q=10&blur=5`
    }
    return lowQualitySrc || originalSrc
  }

  const handleLowQualityLoad = () => {
    setLoadingState('low-quality')
  }

  const handleHighQualityLoad = () => {
    setLoadingState('high-quality')
    onLoad?.()
  }

  const renderPlaceholder = () => {
    if (placeholder === 'skeleton') {
      return (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
        </div>
      )
    }
    
    if (placeholder === 'shimmer') {
      return (
        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
          <div className="shimmer-effect"></div>
        </div>
      )
    }

    return (
      <div className="absolute inset-0 bg-gray-200 animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* 占位符 */}
      {loadingState === 'loading' && renderPlaceholder()}

      {/* 低质量图片 */}
      {isInView && (
        <>
          <Image
            src={generateLowQualityUrl(src)}
            alt={alt}
            width={width}
            height={height}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              loadingState === 'loading' ? 'opacity-0' : 'opacity-100'
            } ${loadingState === 'high-quality' ? 'opacity-0' : ''}`}
            onLoad={handleLowQualityLoad}
            quality={10}
            priority={priority}
          />

          {/* 高质量图片 */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loadingState === 'high-quality' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleHighQualityLoad}
            quality={85}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </>
      )}

      {/* 加载进度指示器 */}
      {loadingState !== 'high-quality' && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {loadingState === 'loading' ? '加载中...' : '优化中...'}
        </div>
      )}
    </div>
  )
} 