'use client'

import React from 'react'
import Footer from '@/components/layout/Footer'
import { useI18n } from '@/lib/i18n'

export default function Blog() {
  const { t } = useI18n()

  return (
    <>
      <div className="pt-24">
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-paw-dark">{t.news?.title}</span>
              </h1>
              <p className="text-lg text-paw-dark/70">{t.news?.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 新闻1：抗衰老新药学术研讨 */}
              <div className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in animation-delay-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-paw-primary font-medium">{t.news?.latest?.items?.[0]?.category}</span>
                    <span className="text-sm text-gray-500">{t.news?.latest?.items?.[0]?.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-paw-dark mb-3">
                    {t.news?.latest?.items?.[0]?.title}
                  </h3>
                  <p className="text-paw-dark/70 mb-4">
                    {t.news?.latest?.items?.[0]?.summary}
                  </p>
                  <a href="https://www.sohu.com/a/831971058_120088173" target="_blank" className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium">
                    {t.news?.latest?.readMore}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* 新闻2：国际创客大赛 */}
              <div className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in animation-delay-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-paw-primary font-medium">{t.news?.latest?.items?.[1]?.category}</span>
                    <span className="text-sm text-gray-500">{t.news?.latest?.items?.[1]?.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-paw-dark mb-3">
                    {t.news?.latest?.items?.[1]?.title}
                  </h3>
                  <p className="text-paw-dark/70 mb-4">
                    {t.news?.latest?.items?.[1]?.summary}
                  </p>
                  <a href="https://cn.chinadaily.com.cn/a/202405/29/WS665721a5a3109f7860de0066.html" target="_blank" className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium">
                    {t.news?.latest?.readMore}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* 新闻3：宠物DNA甲基化检测试剂盒发布 */}
              <div className="glass-card hover:scale-[1.02] transition-all duration-300 animate-fade-in animation-delay-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-paw-primary font-medium">{t.news?.latest?.items?.[2]?.category}</span>
                    <span className="text-sm text-gray-500">{t.news?.latest?.items?.[2]?.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-paw-dark mb-3">
                    {t.news?.latest?.items?.[2]?.title}
                  </h3>
                  <p className="text-paw-dark/70 mb-4">
                    {t.news?.latest?.items?.[2]?.summary}
                  </p>
                  <a href="https://www.linkedin.com/posts/paw-therapeutics_petlongevity-aiinbiotech-veterinaryinnovation-activity-7336176955270090752-qxQy" target="_blank" className="inline-flex items-center text-paw-primary hover:text-paw-deep transition-colors font-medium">
                    {t.news?.latest?.readMore}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a href="#" className="btn-secondary inline-flex items-center">
                {t.news?.latest?.cta}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
} 