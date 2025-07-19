import React from 'react';
import { useI18n } from '../../lib/i18n';
import Image from 'next/image';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function ProductsSection() {
  const { t } = useI18n();
  
  return (
    <section id="products" className="py-16 md:py-24 bg-paw-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.products.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80">{t.products.subtitle}</p>
        </ScrollAnimatedElement>
        
        {/* 宠物衰老甲基化检测试剂盒 */}
        <ScrollAnimatedElement animation="fade-up" delay={200}>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <ScrollAnimatedElement animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-paw-primary mb-8 text-center">
                {t.products.methylationKit.name}
              </h2>
            </ScrollAnimatedElement>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* 左侧：产品图片 */}
              <ScrollAnimatedElement animation="slide-left" delay={300} className="order-2 md:order-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-paw-primary to-paw-deep rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-gradient-to-br from-paw-light to-white rounded-2xl overflow-hidden shadow-xl">
                    <Image 
                      src="/images/products/methylation-kit.jpg" 
                      alt={t.products.methylationKit.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    {/* 占位符 */}
                    <div className="absolute inset-2 bg-gradient-to-br from-paw-light to-white rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto mb-4 bg-paw-primary/10 rounded-2xl flex items-center justify-center">
                          <svg className="w-20 h-20 text-paw-primary" viewBox="0 0 100 100">
                            <rect x="20" y="20" width="60" height="40" rx="5" fill="currentColor" opacity={0.3}/>
                            <rect x="25" y="25" width="50" height="30" rx="3" fill="currentColor" opacity={0.5}/>
                            <rect x="30" y="30" width="40" height="20" rx="2" fill="currentColor"/>
                            <text x="50" y="75" fontSize="12" textAnchor="middle" fill="currentColor">检测试剂盒</text>
                          </svg>
                        </div>
                        <p className="text-gray-500">产品图片加载中...</p>
                        <p className="text-sm text-gray-400 mt-2">请将产品图片放置在 /public/images/products/ 目录</p>
                      </div>
                    </div>
                  </div>
                  {/* 产品特色标签 */}
                  <ScrollAnimatedElement animation="scale" delay={600} className="absolute top-4 right-4 bg-paw-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {t.products.methylationKit.tag}
                  </ScrollAnimatedElement>
                </div>
              </ScrollAnimatedElement>
              
              {/* 右侧：产品信息 */}
              <div className="order-1 md:order-2 space-y-6">
                <ScrollAnimatedElement animation="slide-right" delay={400}>
                  <div className="inline-flex items-center px-4 py-2 bg-paw-primary/10 rounded-full">
                    <span className="text-sm font-medium text-paw-primary">{t.products.methylationKit.tag}</span>
                  </div>
                </ScrollAnimatedElement>
                

                
                <ScrollAnimatedElement animation="slide-right" delay={600}>
                  <p className="text-lg text-paw-dark/80 leading-relaxed">
                    {t.products.methylationKit.description}
                  </p>
                </ScrollAnimatedElement>
                
                <div className="space-y-4">
                  {[
                    { icon: "✓", title: t.products.methylationKit.features.nonInvasive.title, desc: t.products.methylationKit.features.nonInvasive.description },
                    { icon: "✓", title: t.products.methylationKit.features.fastReport.title, desc: t.products.methylationKit.features.fastReport.description },
                    { icon: "✓", title: t.products.methylationKit.features.accuracy.title, desc: t.products.methylationKit.features.accuracy.description },
                    { icon: "✓", title: t.products.methylationKit.features.personalizedRecommendations.title, desc: t.products.methylationKit.features.personalizedRecommendations.description }
                  ].map((feature, index) => (
                    <ScrollAnimatedElement key={index} animation="slide-right" delay={700 + index * 100}>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-paw-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-paw-dark">{feature.title}</h4>
                          <p className="text-paw-dark/70">{feature.desc}</p>
                        </div>
                      </div>
                    </ScrollAnimatedElement>
                  ))}
                </div>
                
                <ScrollAnimatedElement animation="fade-up" delay={1100}>
                  <div className="pt-6">
                    <a href="#contact" className="bg-paw-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-paw-deep transition-colors inline-flex items-center">
                      {t.products.methylationKit.cta}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </a>
                  </div>
                </ScrollAnimatedElement>
              </div>
            </div>
          </div>
        </ScrollAnimatedElement>
      </div>
    </section>
  );
} 