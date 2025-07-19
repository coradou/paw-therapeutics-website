'use client'

import React from 'react'

interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'avatar' | 'image' | 'article' | 'product' | 'team'
  lines?: number
  className?: string
  animate?: boolean
  width?: string
  height?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'text',
  lines = 3,
  className = '',
  animate = true,
  width = 'w-full',
  height = 'h-4'
}) => {
  const baseClasses = `bg-gray-200 rounded ${animate ? 'animate-pulse' : ''}`

  const renderTextSkeleton = () => (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${height} ${
            index === lines - 1 ? 'w-3/4' : width
          }`}
        />
      ))}
    </div>
  )

  const renderCardSkeleton = () => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      <div className={`${baseClasses} h-48 w-full rounded-xl mb-4`} />
      <div className={`${baseClasses} h-6 w-3/4 mb-2`} />
      <div className={`${baseClasses} h-4 w-full mb-1`} />
      <div className={`${baseClasses} h-4 w-2/3`} />
    </div>
  )

  const renderAvatarSkeleton = () => (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className={`${baseClasses} w-12 h-12 rounded-full`} />
      <div className="flex-1 space-y-2">
        <div className={`${baseClasses} h-4 w-3/4`} />
        <div className={`${baseClasses} h-3 w-1/2`} />
      </div>
    </div>
  )

  const renderImageSkeleton = () => (
    <div className={`${baseClasses} ${width} ${height} relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
    </div>
  )

  const renderArticleSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      <div className={`${baseClasses} h-8 w-3/4`} />
      <div className="space-y-2">
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-2/3`} />
      </div>
      <div className={`${baseClasses} h-40 w-full rounded-xl`} />
      <div className="space-y-2">
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-5/6`} />
      </div>
    </div>
  )

  const renderProductSkeleton = () => (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <div className={`${baseClasses} h-48 w-full`} />
      <div className="p-4 space-y-3">
        <div className={`${baseClasses} h-6 w-3/4`} />
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-2/3`} />
        <div className="flex justify-between items-center pt-2">
          <div className={`${baseClasses} h-6 w-20`} />
          <div className={`${baseClasses} h-8 w-24 rounded-full`} />
        </div>
      </div>
    </div>
  )

  const renderTeamSkeleton = () => (
    <div className={`bg-white rounded-2xl p-4 shadow-lg text-center ${className}`}>
      <div className={`${baseClasses} w-24 h-24 rounded-full mx-auto mb-3`} />
      <div className={`${baseClasses} h-5 w-3/4 mx-auto mb-2`} />
      <div className={`${baseClasses} h-4 w-1/2 mx-auto mb-2`} />
      <div className="space-y-1">
        <div className={`${baseClasses} h-3 w-full`} />
        <div className={`${baseClasses} h-3 w-5/6 mx-auto`} />
      </div>
    </div>
  )

  switch (type) {
    case 'card':
      return renderCardSkeleton()
    case 'avatar':
      return renderAvatarSkeleton()
    case 'image':
      return renderImageSkeleton()
    case 'article':
      return renderArticleSkeleton()
    case 'product':
      return renderProductSkeleton()
    case 'team':
      return renderTeamSkeleton()
    default:
      return renderTextSkeleton()
  }
}

// 预设的骨架屏组合
export const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 头部骨架 */}
      <div className="text-center space-y-4">
        <SkeletonLoader type="text" lines={1} height="h-12" width="w-1/2" className="mx-auto" />
        <SkeletonLoader type="text" lines={2} height="h-6" className="max-w-2xl mx-auto" />
      </div>
      
      {/* 内容骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} type="card" />
        ))}
      </div>
    </div>
  </div>
)

export const HeroSkeleton = () => (
  <section className="min-h-screen flex items-center bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <SkeletonLoader type="text" lines={1} height="h-16" width="w-full" />
          <SkeletonLoader type="text" lines={3} height="h-6" />
          <div className="flex gap-4">
            <SkeletonLoader type="text" lines={1} height="h-12" width="w-32" />
            <SkeletonLoader type="text" lines={1} height="h-12" width="w-28" />
          </div>
        </div>
        <SkeletonLoader type="image" width="w-full" height="h-96" className="rounded-3xl" />
      </div>
    </div>
  </section>
)

export default SkeletonLoader 