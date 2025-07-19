"use client";

import React from 'react';
import { StreamLoadingProvider, StreamSection } from '@/components/ui/StreamLoader';
import EnhancedOptimizedImage from '@/components/ui/EnhancedOptimizedImage';
import SkeletonLoader, { HeroSkeleton, PageSkeleton } from '@/components/ui/SkeletonLoader';
import ScrollAnimatedElement from '@/components/ui/ScrollAnimatedElement';

// 示例页面：展示流式加载功能
export default function StreamLoadingExample() {
  return (
    <StreamLoadingProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        
        {/* Hero Section - 高优先级 */}
        <StreamSection 
          sectionId="hero" 
          priority="high"
          loadingComponent={<HeroSkeleton />}
          className="min-h-screen"
        >
          <section className="min-h-screen flex items-center relative overflow-hidden px-8">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <ScrollAnimatedElement animation="fade-up" className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold">
                    <span className="gradient-text">流式加载</span> 体验示例
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    体验边加载边显示的流畅用户体验，内容按优先级逐步呈现，确保用户快速看到重要信息。
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-paw-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-paw-deep transition-colors">
                      开始体验
                    </button>
                    <button className="border-2 border-paw-primary text-paw-primary px-8 py-3 rounded-full font-semibold hover:bg-paw-primary hover:text-white transition-colors">
                      了解更多
                    </button>
                  </div>
                </ScrollAnimatedElement>
                
                <ScrollAnimatedElement animation="scale" delay={300}>
                  <EnhancedOptimizedImage
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop"
                    alt="流式加载示例图片"
                    width={600}
                    height={600}
                    className="w-full h-96 rounded-3xl shadow-2xl"
                    priority={true}
                    loadingType="progressive"
                    placeholder="skeleton"
                    showLoadingProgress={true}
                  />
                </ScrollAnimatedElement>
              </div>
            </div>
          </section>
        </StreamSection>

        {/* Features Section - 中等优先级 */}
        <StreamSection 
          sectionId="features" 
          priority="medium"
          loadingComponent={
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <SkeletonLoader type="text" lines={1} height="h-12" width="w-1/2" className="mx-auto mb-4" />
                  <SkeletonLoader type="text" lines={2} height="h-6" className="max-w-2xl mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonLoader key={index} type="card" />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">流式加载特性</h2>
                <p className="text-xl text-gray-600">多种加载方式，提供最佳用户体验</p>
              </ScrollAnimatedElement>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <ScrollAnimatedElement key={index} animation="scale" delay={index * 100}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow card-stream-in">
                      <div className="w-12 h-12 bg-paw-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </ScrollAnimatedElement>
                ))}
              </div>
            </div>
          </section>
        </StreamSection>

        {/* Gallery Section - 中等优先级 */}
        <StreamSection 
          sectionId="gallery" 
          priority="medium"
          loadingComponent={
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <SkeletonLoader type="text" lines={1} height="h-10" width="w-1/3" className="mx-auto mb-12" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonLoader key={index} type="image" width="w-full" height="h-48" className="rounded-xl" />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
                <h2 className="text-3xl font-bold">图片画廊</h2>
                <p className="text-gray-600 mt-2">不同加载方式的图片展示</p>
              </ScrollAnimatedElement>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <ScrollAnimatedElement 
                    key={index} 
                    animation="scale" 
                    delay={index * 50}
                    className="group"
                  >
                    <EnhancedOptimizedImage
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={200}
                      className="w-full h-48 rounded-xl hover:scale-105 transition-transform duration-300"
                      loadingType={image.loadingType}
                      placeholder={image.placeholder}
                      showLoadingProgress={true}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium">{image.title}</p>
                      <p className="text-xs text-gray-500">{image.type}</p>
                    </div>
                  </ScrollAnimatedElement>
                ))}
              </div>
            </div>
          </section>
        </StreamSection>

        {/* Footer Section - 低优先级 */}
        <StreamSection 
          sectionId="footer" 
          priority="low"
          loadingComponent={
            <footer className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-4">
                      <SkeletonLoader type="text" lines={1} height="h-6" width="w-3/4" />
                      <SkeletonLoader type="text" lines={4} height="h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </footer>
          }
        >
          <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <ScrollAnimatedElement animation="fade-up">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">体验完成！</h3>
                  <p className="text-gray-300 mb-8">感谢体验我们的流式加载功能</p>
                  <button className="bg-paw-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-paw-deep transition-colors">
                    返回主页
                  </button>
                </div>
              </ScrollAnimatedElement>
            </div>
          </footer>
        </StreamSection>

      </div>
    </StreamLoadingProvider>
  );
}

// 特性数据
const features = [
  {
    icon: "🚀",
    title: "渐进式加载",
    description: "先显示低质量图片，再逐步加载高质量版本，确保快速响应"
  },
  {
    icon: "💀",
    title: "骨架屏",
    description: "在内容加载期间显示结构化占位符，让用户了解即将出现的内容"
  },
  {
    icon: "✨",
    title: "智能懒加载",
    description: "只有当内容即将进入视口时才开始加载，节省带宽和提升性能"
  }
];

// 画廊图片数据
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    alt: "渐进式加载示例",
    title: "渐进式加载",
    type: "Progressive",
    loadingType: "progressive" as const,
    placeholder: "skeleton" as const
  },
  {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
    alt: "骨架屏示例",
    title: "骨架屏",
    type: "Skeleton",
    loadingType: "skeleton" as const,
    placeholder: "skeleton" as const
  },
  {
    src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=300&fit=crop",
    alt: "闪烁效果示例",
    title: "闪烁效果",
    type: "Shimmer",
    loadingType: "simple" as const,
    placeholder: "shimmer" as const
  },
  {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
    alt: "简单加载示例",
    title: "简单加载",
    type: "Simple",
    loadingType: "simple" as const,
    placeholder: "blur" as const
  }
]; 