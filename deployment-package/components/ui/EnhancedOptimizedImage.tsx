'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
// import SkeletonLoader from './SkeletonLoader'

interface EnhancedOptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'skeleton' | 'shimmer'
  blurDataURL?: string
  loadingType?: 'progressive' | 'skeleton' | 'simple'
  showLoadingProgress?: boolean
  onLoad?: () => void
}

export default function EnhancedOptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  loadingType = 'progressive',
  showLoadingProgress = true,
  onLoad,
}: EnhancedOptimizedImageProps) {
  const [loadingState, setLoadingState] = useState<'loading' | 'low-quality' | 'high-quality'>('loading')
  const [isInView, setIsInView] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const imgRef = useRef<HTMLDivElement>(null)

  // 懒加载检测
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
        rootMargin: '100px' // 提前100px开始加载
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // 模拟加载进度
  useEffect(() => {
    if (isInView && loadingState === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return prev
          }
          return prev + Math.random() * 20
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isInView, loadingState])

  // 生成低质量图片URL
  const generateLowQualityUrl = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&w=50&q=10&blur=3`
    }
    // 对本地图片，我们可以使用原图但设置很低的质量
    return originalSrc
  }

  const handleLowQualityLoad = () => {
    setLoadingState('low-quality')
    setLoadingProgress(60)
  }

  const handleHighQualityLoad = () => {
    setLoadingState('high-quality')
    setLoadingProgress(100)
    onLoad?.()
  }

  const renderLoadingPlaceholder = () => {
    if (placeholder === 'skeleton') {
      return (
        <div className="absolute inset-0 bg-gray-200">
          <div className="w-full h-full bg-gray-200 animate-pulse" />
          {showLoadingProgress && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/50 rounded-full p-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          )}
        </div>
      )
    }

    if (placeholder === 'shimmer') {
      return (
        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
          <div className="shimmer-effect" />
          {showLoadingProgress && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {Math.round(loadingProgress)}%
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {showLoadingProgress && (
            <div className="text-xs text-gray-500">{Math.round(loadingProgress)}%</div>
          )}
        </div>
      </div>
    )
  }

  // 默认的模糊占位符
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* 加载占位符 */}
      {loadingState === 'loading' && renderLoadingPlaceholder()}

      {/* 渐进式加载 */}
      {isInView && loadingType === 'progressive' && (
        <>
          {/* 低质量图片 */}
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
            style={{ filter: 'blur(2px)', transform: 'scale(1.02)' }}
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

      {/* 简单加载 */}
      {isInView && loadingType === 'simple' && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loadingState === 'high-quality' ? 'opacity-100' : 'opacity-0'
          }`}
          priority={priority}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          onLoad={handleHighQualityLoad}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* 骨架屏加载 */}
      {isInView && loadingType === 'skeleton' && loadingState !== 'high-quality' && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        </div>
      )}

      {isInView && loadingType === 'skeleton' && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loadingState === 'high-quality' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleHighQualityLoad}
          quality={85}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* 加载状态指示器 */}
      {loadingState !== 'high-quality' && showLoadingProgress && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {loadingState === 'loading' && '加载中...'}
          {loadingState === 'low-quality' && '优化中...'}
        </div>
      )}
    </div>
  )
} 