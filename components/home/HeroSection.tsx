"use client";

import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';
import Image from 'next/image';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';
import OptimizedImage from '../ui/OptimizedImage';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 tech-pattern opacity-5"></div>
      <ScrollAnimatedElement animation="scale" className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl floating">
        <div></div>
      </ScrollAnimatedElement>
      <ScrollAnimatedElement animation="scale" delay={500} className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl floating">
        <div style={{animationDelay: '1.5s'}}></div>
      </ScrollAnimatedElement>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          <div className="space-y-3 md:space-y-6 order-2 md:order-1">
            <ScrollAnimatedElement animation="fade-up" delay={0}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-paw-primary/10 to-paw-accent/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
              <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium text-paw-dark">{t.hero.tagline}</span>
            </div>
            </ScrollAnimatedElement>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-paw-dark">{t.hero.title}</span><br/>
                <span className="gradient-text animate-gradient">{t.hero.subtitle}</span>
            </h1>
            
            <h2 className="text-lg md:text-2xl lg:text-3xl text-paw-dark/80 font-light">
              {t.hero.platform}
            </h2>
            
            <p className="text-sm md:text-lg text-paw-dark/70 leading-relaxed">
              {t.hero.description}
            </p>
            
            <ScrollAnimatedElement animation="fade-up" delay={400}>
            <div className="flex flex-wrap gap-3 md:gap-4 pt-1 md:pt-4">
              <Link href="#about" className="btn-primary group">
                <span className="relative z-10">{t.hero.primary}</span>
              </Link>
              <Link href="#contact" className="btn-secondary">{t.hero.secondary}</Link>
            </div>
            </ScrollAnimatedElement>
            
            {/* 数据展示 */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-3 md:pt-8">
              <ScrollAnimatedElement animation="scale" delay={500}>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-paw-primary">{t.stats.accuracy.value}</div>
                <div className="text-xs md:text-sm text-paw-dark/60">{t.stats.accuracy.label}</div>
              </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="scale" delay={600}>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-paw-primary">{t.stats.compounds.value}</div>
                <div className="text-xs md:text-sm text-paw-dark/60">{t.stats.compounds.label}</div>
              </div>
              </ScrollAnimatedElement>
              <ScrollAnimatedElement animation="scale" delay={700}>
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-paw-primary">{t.stats.time.value}</div>
                <div className="text-xs md:text-sm text-paw-dark/60">{t.stats.time.label}</div>
              </div>
              </ScrollAnimatedElement>
            </div>
          </div>
          
          <ScrollAnimatedElement animation="blur" delay={300} className="relative order-1 md:order-2">
            <div className="relative">
              {/* 3D卡片效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-paw-primary to-paw-deep rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-paw-deep to-paw-primary rounded-3xl transform -rotate-6 opacity-20"></div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl glass-card p-2">
                {/* 白猫在樱花树上的照片 */}
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop"
                  alt="白猫在樱花树上"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover rounded-2xl"
                  priority={true}
                />
                
                {/* 占位符（当图片无法加载时显示） */}
                <div id="cat-placeholder" className="absolute inset-2 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl flex items-center justify-center hidden">
                  <div className="text-center p-8">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto mb-4 floating">
                      <ellipse cx="35" cy="25" rx="8" ry="12" fill="#007C8C"/>
                      <ellipse cx="50" cy="20" rx="8" ry="12" fill="#007C8C"/>
                      <ellipse cx="65" cy="25" rx="8" ry="12" fill="#007C8C"/>
                      <ellipse cx="25" cy="40" rx="8" ry="12" fill="#007C8C"/>
                      <ellipse cx="75" cy="40" rx="8" ry="12" fill="#007C8C"/>
                      <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="#007C8C"/>
                      <rect x="46" y="50" width="8" height="20" fill="white"/>
                      <rect x="40" y="56" width="20" height="8" fill="white"/>
                    </svg>
                    <p className="text-paw-dark/60">请添加猫咪图片</p>
                  </div>
                </div>
                
                {/* Logo标记 */}
                <ScrollAnimatedElement animation="scale" delay={800} className="absolute top-4 md:top-6 right-4 md:right-6 glass-card p-2 md:p-3">
                  <svg viewBox="0 0 100 100" className="w-6 md:w-12 h-6 md:h-12">
                    <ellipse cx="35" cy="25" rx="8" ry="12" fill="#0F1114"/>
                    <ellipse cx="50" cy="20" rx="8" ry="12" fill="#0F1114"/>
                    <ellipse cx="65" cy="25" rx="8" ry="12" fill="#0F1114"/>
                    <ellipse cx="25" cy="40" rx="8" ry="12" fill="#0F1114"/>
                    <ellipse cx="75" cy="40" rx="8" ry="12" fill="#0F1114"/>
                    <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="#0F1114"/>
                    <rect x="46" y="50" width="8" height="20" fill="white"/>
                    <rect x="40" y="56" width="20" height="8" fill="white"/>
                  </svg>
                </ScrollAnimatedElement>
                
                {/* 科技感装饰线 */}
                <ScrollAnimatedElement animation="slide-left" delay={1000} className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </ScrollAnimatedElement>
              </div>
            </div>
            <ScrollAnimatedElement animation="fade-up" delay={1200}>
            <p className="text-center mt-3 md:mt-6 text-sm md:text-lg font-medium text-paw-primary/90">
              {t.hero.bottomText}
            </p>
            </ScrollAnimatedElement>
          </ScrollAnimatedElement>
        </div>
      </div>
    </section>
  );
} 