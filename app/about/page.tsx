'use client'

import OptimizedImage from '@/components/ui/OptimizedImage'
import AnimatedElement from '@/components/ui/AnimatedElement'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Globe, Award, Lightbulb, Shield, Target, TrendingUp, Medal, Building, Microscope, Leaf, CheckCircle, HandHeart } from 'lucide-react'
import { useI18n } from '../../lib/i18n'

export default function AboutPage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">


      {/* Core Brand Promise and Mission Combined */}
      <section className="min-h-screen relative overflow-hidden">
        {/* 多层背景设计 */}
        <div className="absolute inset-0">
          {/* 主背景渐变 - 从顶部较浅确保导航栏可见 */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-800 to-slate-900"></div>
          
          {/* 第二层渐变增强沉浸感 */}
          <div className="absolute inset-0 bg-gradient-to-br from-paw-primary/10 via-paw-deep/50 to-paw-deep/90"></div>
          
          {/* 装饰性网格背景 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_79px,rgba(255,255,255,0.1)_80px,rgba(255,255,255,0.1)_81px,transparent_82px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          </div>
          
          {/* 流动的光效背景 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-paw-primary/20 to-paw-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-paw-secondary/30 to-paw-deep/30 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-paw-deep/15 to-paw-primary/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
          
          {/* 爱心装饰元素 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-1/4 transform -translate-x-1/2">
              <Heart className="w-8 h-8 text-red-300 animate-pulse" />
            </div>
            <div className="absolute top-40 right-1/4 transform translate-x-1/2">
              <Heart className="w-6 h-6 text-pink-300 animate-pulse animation-delay-600" />
            </div>
            <div className="absolute bottom-40 left-1/3 transform -translate-x-1/2">
              <Heart className="w-4 h-4 text-red-200 animate-pulse animation-delay-1000" />
            </div>
            <div className="absolute bottom-60 right-1/3 transform translate-x-1/2">
              <Heart className="w-10 h-10 text-pink-200 animate-pulse animation-delay-400" />
            </div>
          </div>
          
          {/* 顶部渐变蒙版确保导航栏可见 */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-1 min-h-screen">
            {/* Brand Promise - Top Half */}
            <div className="flex items-end justify-center pt-20 pb-8">
              <div className="max-w-6xl mx-auto text-center">
                <AnimatedElement animation="fade-up" delay={300}>
                  <div className="relative">
                    {/* Elegant brand statement - Simplified */}
                    <div className="mb-8">
                      <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                        {t.about.brandPromise}
                      </h2>
                      <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
                    </div>
                    
                    {/* Poetic description */}
                    <div className="relative space-y-4 mb-8">
                      <p className="text-xl md:text-2xl lg:text-3xl font-light text-blue-100 leading-relaxed drop-shadow-md">
                        {t.about.poetic1}
                      </p>
                      <p className="text-lg md:text-xl lg:text-2xl text-blue-200 font-light opacity-90 drop-shadow-md">
                        {t.about.poetic2}
                      </p>
                    </div>
                    
                    {/* About title */}
                    <div className="mb-8">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                        {t.about.aboutTitle}
                      </h1>
                      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-4"></div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/60"></div>
                      <div className="relative">
                        <Heart className="w-8 h-8 text-red-300 animate-pulse drop-shadow-lg" />
                        <div className="absolute -inset-2 bg-red-300/20 rounded-full animate-ping"></div>
                      </div>
                      <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/60"></div>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Mission, Vision, Values - Bottom Half */}
            <div className="flex items-start justify-center pt-8 pb-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <AnimatedElement animation="fade-up" delay={200}>
                    <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{t.about.mission.title}</h3>
                      <p className="text-blue-100 leading-relaxed flex-grow">
                        {t.about.mission.content}
                      </p>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={400}>
                    <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{t.about.vision.title}</h3>
                      <p className="text-blue-100 leading-relaxed flex-grow">
                        {t.about.vision.content}
                      </p>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={600}>
                    <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{t.about.values.title}</h3>
                      <p className="text-blue-100 leading-relaxed flex-grow">
                        {t.about.values.content}
                      </p>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Responsibility and Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.responsibility.title}</h2>
              <p className="text-xl text-gray-600">{t.about.responsibility.subtitle}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatedElement animation="fade-up" delay={300}>
              <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.responsibility.ethics.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {t.about.responsibility.ethics.content}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.responsibility.sustainability.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {t.about.responsibility.sustainability.content}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={500}>
              <div className="text-center bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HandHeart className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.responsibility.animalWelfare.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {t.about.responsibility.animalWelfare.content}
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={600}>
              <div className="text-center bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.responsibility.healthcare.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {t.about.responsibility.healthcare.content}
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.keyMetrics.title}</h2>
              <p className="text-xl text-gray-600">{t.about.keyMetrics.subtitle}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedElement animation="fade-up" delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 bg-paw-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-8 h-8 text-paw-primary" />
                </div>
                <div className="text-3xl font-bold text-paw-primary mb-2">5+</div>
                <div className="text-gray-600">{t.about.keyMetrics.projects}</div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="text-center">
                <div className="w-16 h-16 bg-paw-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-paw-secondary" />
                </div>
                <div className="text-3xl font-bold text-paw-secondary mb-2">70%</div>
                <div className="text-gray-600">{t.about.keyMetrics.investment}</div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={500}>
              <div className="text-center">
                <div className="w-16 h-16 bg-paw-deep/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-paw-deep" />
                </div>
                <div className="text-3xl font-bold text-paw-deep mb-2">3+</div>
                <div className="text-gray-600">{t.about.keyMetrics.partnerships}</div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={600}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-500 mb-2">2025</div>
                <div className="text-gray-600">{t.about.keyMetrics.founded}</div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Scientific Excellence */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement animation="slide-left" delay={200}>
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800">{t.about.scientificExcellence.title}</h2>
                <p className="text-xl text-gray-600 mb-8">
                  {t.about.scientificExcellence.subtitle}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-paw-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-paw-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{t.about.scientificExcellence.aiDriven.title}</h3>
                      <p className="text-gray-600">{t.about.scientificExcellence.aiDriven.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-paw-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-paw-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{t.about.scientificExcellence.crossSpecies.title}</h3>
                      <p className="text-gray-600">{t.about.scientificExcellence.crossSpecies.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-paw-deep/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Medal className="w-5 h-5 text-paw-deep" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{t.about.scientificExcellence.international.title}</h3>
                      <p className="text-gray-600">{t.about.scientificExcellence.international.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right" delay={400}>
              <div className="relative">
                <div className="bg-gradient-to-br from-paw-primary/10 to-paw-secondary/10 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-paw-primary mb-2">IL11</div>
                      <div className="text-sm text-gray-600">{t.about.scientificExcellence.metrics.firstTarget}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-paw-secondary mb-2">IGF-1</div>
                      <div className="text-sm text-gray-600">{t.about.scientificExcellence.metrics.keyTarget}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-paw-deep mb-2">TGF-β</div>
                      <div className="text-sm text-gray-600">{t.about.scientificExcellence.metrics.coreTarget}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500 mb-2">5+</div>
                      <div className="text-sm text-gray-600">{t.about.scientificExcellence.metrics.researchProjects}</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.researchAreas.title}</h2>
              <p className="text-xl text-gray-600">{t.about.researchAreas.subtitle}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement animation="fade-up" delay={300}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-paw-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-paw-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.researchAreas.animalLongevity.title}</h3>
                <p className="text-gray-600 mb-6">
                  {t.about.researchAreas.animalLongevity.content}
                </p>
                <div className="text-sm text-paw-primary font-medium">
                  {t.about.researchAreas.animalLongevity.projects}
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-paw-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-paw-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.researchAreas.agingDiseases.title}</h3>
                <p className="text-gray-600 mb-6">
                  {t.about.researchAreas.agingDiseases.content}
                </p>
                <div className="text-sm text-paw-secondary font-medium">
                  {t.about.researchAreas.agingDiseases.projects}
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={500}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-paw-deep/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-paw-deep" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t.about.researchAreas.humanAntiAging.title}</h3>
                <p className="text-gray-600 mb-6">
                  {t.about.researchAreas.humanAntiAging.content}
                </p>
                <div className="text-sm text-paw-deep font-medium">
                  {t.about.researchAreas.humanAntiAging.projects}
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Corporate Responsibility */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.corporateResponsibilityAlt.title}</h2>
              <p className="text-xl text-gray-600">{t.about.corporateResponsibilityAlt.subtitle}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedElement animation="fade-up" delay={300}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t.about.corporateResponsibilityAlt.scientificEthics.title}</h3>
                    <p className="text-gray-600">{t.about.corporateResponsibilityAlt.scientificEthics.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t.about.corporateResponsibilityAlt.sustainability.title}</h3>
                    <p className="text-gray-600">{t.about.corporateResponsibilityAlt.sustainability.content}</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t.about.corporateResponsibilityAlt.animalWelfare.title}</h3>
                    <p className="text-gray-600">{t.about.corporateResponsibilityAlt.animalWelfare.content}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{t.about.corporateResponsibilityAlt.publicHealth.title}</h3>
                    <p className="text-gray-600">{t.about.corporateResponsibilityAlt.publicHealth.content}</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Company Photo */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.companyPhoto.title}</h2>
              <p className="text-xl text-gray-600">{t.about.companyPhoto.subtitle}</p>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="fade-up" delay={400}>
            <div className="relative max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <OptimizedImage
                  src="/images/lulu-climbing-tree.jpg"
                  alt={t.about.companyPhoto.imageAlt}
                  className="w-full h-96 object-cover object-[center_30%] scale-105 hover:scale-110 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-gray-800">
                  <h3 className="text-2xl mb-2">{t.about.companyPhoto.imageTitle}</h3>
                  <p className="text-lg">{t.about.companyPhoto.imageDescription}</p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.about.leadership.title}</h2>
              <p className="text-xl text-gray-600">{t.about.leadership.subtitle}</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedElement animation="fade-up" delay={300}>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-paw-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-paw-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{t.about.leadership.worldClassTeam.title}</h3>
                <p className="text-gray-600">{t.about.leadership.worldClassTeam.content}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={400}>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-paw-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-paw-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{t.about.leadership.nobelLaureate.title}</h3>
                <p className="text-gray-600">{t.about.leadership.nobelLaureate.content}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={500}>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 bg-paw-deep/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-10 h-10 text-paw-deep" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{t.about.leadership.interdisciplinary.title}</h3>
                <p className="text-gray-600">{t.about.leadership.interdisciplinary.content}</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-paw-primary to-paw-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AnimatedElement animation="fade-up" delay={200}>
              <h2 className="text-4xl font-bold mb-6">{t.about.callToAction.title}</h2>
              <p className="text-xl mb-8 text-blue-100">
                {t.about.callToAction.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/pipeline" 
                  className="inline-flex items-center px-8 py-4 bg-white text-paw-primary rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  {t.about.callToAction.learnPipeline}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold backdrop-blur-sm"
                >
                  {t.about.callToAction.contactUs}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </div>
  )
} 