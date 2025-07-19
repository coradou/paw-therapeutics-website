'use client'

import React from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import { useI18n } from '../../lib/i18n'

export default function Products() {
  const { t } = useI18n()
  
  return (
    <>
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-paw-light">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-paw-primary">{t.products.title}</span>
              </h1>
              <p className="text-xl text-paw-dark/80">{t.products.subtitle}</p>
            </div>
            
            {/* Pet Aging Methylation Test Kit */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="bg-paw-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    {t.products.methylationKit.tag}
                  </span>

                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-paw-primary">
                  {t.products.methylationKit.name}
                </h2>

              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* 左侧：产品图片 */}
                <div className="order-2 md:order-1">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-paw-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative w-full h-96">
                        <Image
                          src="/images/products/methylation-kit.jpg"
                          alt={t.products.methylationKit.name}
                          fill
                          className="object-cover object-center"
                          priority
                        />
                        {/* 优雅的渐变遮罩 */}
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    </div>
                    {/* Product feature label */}
                    <div className="absolute top-4 right-4 bg-paw-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {t.products.methylationKit.tag}
                    </div>
                  </div>
                </div>
                
                {/* Right side: Product information */}
                <div className="order-1 md:order-2 space-y-6">

                  
                  <h3 className="text-2xl font-bold text-paw-dark">{t.products.methylationKit.title}</h3>
                  
                  <p className="text-lg text-paw-dark/80 leading-relaxed">
                    {t.products.methylationKit.description}
                  </p>
                  
                  <div className="space-y-4">

                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-paw-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-paw-dark">{t.products.methylationKit.features.nonInvasive.title}</h4>
                        <p className="text-paw-dark/70">{t.products.methylationKit.features.nonInvasive.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-paw-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-paw-dark">{t.products.methylationKit.features.fastReport.title}</h4>
                        <p className="text-paw-dark/70">{t.products.methylationKit.features.fastReport.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-paw-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-paw-dark">{t.products.methylationKit.features.accuracy.title}</h4>
                        <p className="text-paw-dark/70">{t.products.methylationKit.features.accuracy.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-paw-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-paw-dark">{t.products.methylationKit.features.personalizedRecommendations.title}</h4>
                        <p className="text-paw-dark/70">{t.products.methylationKit.features.personalizedRecommendations.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <a href="/contact" className="btn-primary inline-flex items-center">
                      {t.products.methylationKit.cta}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
} 