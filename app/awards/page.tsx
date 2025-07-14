'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../../lib/i18n'
import OptimizedImage from '../../components/ui/OptimizedImage'
import AnimatedElement from '../../components/ui/AnimatedElement'

interface Milestone {
  id: string
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
}

export default function MilestonesPage() {
  const { t } = useI18n()
  const [scrollY, setScrollY] = useState(0)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 安全获取翻译文本的函数
  const safeGet = (path: string, defaultValue: string = '') => {
    if (!t) return defaultValue
    
    const keys = path.split('.')
    let current = t
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        return defaultValue
      }
    }
    
    return typeof current === 'string' ? current : defaultValue
  }

  // 获取里程碑数据
  const getMilestones = (): Milestone[] => {
    return [
      {
        id: '1',
        title: safeGet('awards.page.milestones.items.0.title', '公司成立'),
        description: safeGet('awards.page.milestones.items.0.description', '爪子制药正式成立，开启AI驱动的跨物种延寿药物发现之旅'),
        icon: '🏢',
        color: 'from-blue-500 to-purple-600',
        bgColor: 'bg-blue-50'
      },
      {
        id: '2',
        title: safeGet('awards.page.milestones.items.1.title', '核心技术架构完成'),
        description: safeGet('awards.page.milestones.items.1.description', '成功完成AI驱动的跨物种延寿药物发现平台核心技术架构'),
        icon: '🔬',
        color: 'from-green-500 to-teal-600',
        bgColor: 'bg-green-50'
      },
      {
        id: '3',
        title: safeGet('awards.page.milestones.items.2.title', '产品原型开发'),
        description: safeGet('awards.page.milestones.items.2.description', '宠物DNA甲基化衰老检测技术原型完成，为延寿药物开发奠定基础'),
        icon: '🧬',
        color: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-50'
      },
      {
        id: '4',
        title: safeGet('awards.page.milestones.items.3.title', '深圳研发中心设立'),
        description: safeGet('awards.page.milestones.items.3.description', '在深圳建立研发中心，汇聚顶尖人才，加速技术创新'),
        icon: '🏭',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-50'
      },
      {
        id: '5',
        title: safeGet('awards.page.milestones.items.4.title', '技术团队扩充'),
        description: safeGet('awards.page.milestones.items.4.description', '聚集了来自全球的顶尖科学家和工程师，形成强大的技术团队'),
        icon: '👥',
        color: 'from-teal-500 to-blue-600',
        bgColor: 'bg-teal-50'
      },
      {
        id: '6',
        title: safeGet('awards.page.milestones.items.5.title', '网站平台上线'),
        description: safeGet('awards.page.milestones.items.5.description', '官方网站正式上线，展示公司愿景和技术实力'),
        icon: '🌐',
        color: 'from-indigo-500 to-purple-600',
        bgColor: 'bg-indigo-50'
      }
    ]
  }

  useEffect(() => {
    setMilestones(getMilestones())
  }, [t])

  const calculateMilestoneProgress = (index: number) => {
    if (!sectionRef.current) return 0
    
    const sectionRect = sectionRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    if (sectionRect.top > windowHeight) return 0
    if (sectionRect.bottom < 0) return 1
    
    const sectionHeight = sectionRect.height
    const visibleHeight = Math.min(windowHeight, sectionRect.bottom) - Math.max(0, sectionRect.top)
    const progress = visibleHeight / sectionHeight
    
    const itemProgress = (progress * milestones.length) - index
    return Math.max(0, Math.min(1, itemProgress))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-paw-primary to-paw-secondary pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-white">
            <AnimatedElement>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {safeGet('awards.page.title', '发展历程')}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-4xl mx-auto px-4 leading-relaxed">
                {safeGet('awards.page.subtitle', '见证爪子制药从创立到发展的每一个重要时刻')}
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* 时间轴部分 */}
      <section className="py-20 bg-white" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-paw-dark mb-4 leading-tight">
                🚀 {safeGet('awards.page.milestones.title', '成长里程碑')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                {safeGet('awards.page.milestones.subtitle', '跟随我们的足迹，了解每一个重要发展阶段')}
              </p>
            </div>
          </AnimatedElement>

          <div className="relative">
            {/* 桌面端布局 */}
            <div className="hidden md:block">
              {/* 主时间轴线 - 更亮的设计 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-paw-primary via-paw-secondary to-paw-primary h-full shadow-lg"></div>
              
              {milestones.map((milestone, index) => {
                const milestoneProgress = calculateMilestoneProgress(index)
                const isLeft = index % 2 === 0
                
                return (
                  <AnimatedElement key={milestone.id} delay={index * 0.2}>
                    <div className={`relative flex items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}>
                      {/* 时间线圆点 - 全部亮起 */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                        <div className={`w-7 h-7 rounded-full border-4 border-white shadow-xl transition-all duration-500 bg-gradient-to-r ${milestone.color} scale-110 hover:scale-125`}>
                          <div className={`absolute -inset-4 rounded-full transition-all duration-500 bg-gradient-to-r ${milestone.color} opacity-25 animate-pulse`}></div>
                        </div>
                      </div>

                      {/* 内容卡片 */}
                      <div className="w-5/12">
                        <div className={`relative ${milestone.bgColor} rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-gradient-to-b ${milestone.color}`}>
                          <div className="flex items-start space-x-4">
                            <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
                              {milestone.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold text-paw-dark mb-3 leading-snug break-words">
                                {milestone.title}
                              </h3>
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                )
              })}
            </div>

            {/* 移动端布局 - 时间轴在右侧 */}
            <div className="md:hidden">
              {/* 移动端时间轴线 - 在右侧，更亮的设计 */}
              <div className="absolute right-8 top-0 w-2 bg-gradient-to-b from-paw-primary via-paw-secondary to-paw-primary h-full shadow-lg"></div>
              
              {milestones.map((milestone, index) => {
                const milestoneProgress = calculateMilestoneProgress(index)
                
                return (
                  <AnimatedElement key={milestone.id} delay={index * 0.2}>
                    <div className="relative flex items-center mb-12">
                      {/* 时间线圆点 - 在右侧，全部亮起 */}
                      <div className="absolute right-8 transform translate-x-1/2 z-10">
                        <div className={`w-6 h-6 rounded-full border-3 border-white shadow-xl transition-all duration-500 bg-gradient-to-r ${milestone.color} scale-110 hover:scale-125`}>
                          <div className={`absolute -inset-3 rounded-full transition-all duration-500 bg-gradient-to-r ${milestone.color} opacity-25 animate-pulse`}></div>
                        </div>
                      </div>

                      {/* 内容卡片 - 占据大部分空间，留出右侧空间给时间轴 */}
                      <div className="w-full pr-16">
                        <div className={`relative ${milestone.bgColor} rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-gradient-to-b ${milestone.color}`}>
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-lg sm:text-xl shadow-lg`}>
                              {milestone.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-bold text-paw-dark mb-2 leading-snug break-words">
                                {milestone.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed break-words">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 获奖照片展示 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-paw-dark mb-4 leading-tight">
                🏆 {safeGet('awards.page.awardsGallery.title', '获奖精彩瞬间')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                {safeGet('awards.page.awardsGallery.subtitle', '记录我们在各大创业比赛中的荣耀时刻')}
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 牛津创业比赛 */}
            <AnimatedElement delay={0.1}>
              <div className="relative group">
                <div className="aspect-w-16 aspect-h-10 bg-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-full h-full p-4">
                    <OptimizedImage
                      src="/images/awards/oxford-startup-competition.png"
                      alt="牛津创业比赛"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🥇</span>
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed break-words">
                    {safeGet('awards.page.awardsGallery.awards.oxford', '牛津创业比赛获奖')}
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* 剑桥创英杯 */}
            <AnimatedElement delay={0.2}>
              <div className="relative group">
                <div className="aspect-w-16 aspect-h-10 bg-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-full h-full p-4">
                    <OptimizedImage
                      src="/images/awards/cambridge-innovation-award.jpg"
                      alt="剑桥创英杯"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed break-words">
                    {safeGet('awards.page.awardsGallery.awards.cambridge', '剑桥创英杯大赛获奖')}
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* 张江创赛 */}
            <AnimatedElement delay={0.3}>
              <div className="relative group">
                <div className="aspect-w-16 aspect-h-10 bg-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-full h-full p-4">
                    <OptimizedImage
                      src="/images/awards/zhangjiang-startup-competition-ceremony.jpg"
                      alt="张江首届创赛明珠杯"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🥈</span>
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed break-words">
                    {safeGet('awards.page.awardsGallery.awards.zhangjiang', '张江首届创赛明珠杯颁奖仪式')}
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* 罗氏-HDRUK */}
            <AnimatedElement delay={0.4}>
              <div className="relative group">
                <div className="aspect-w-16 aspect-h-10 bg-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-full h-full p-4">
                    <OptimizedImage
                      src="/images/awards/roche-hdruk-ai-pharma-uk-champion.jpg"
                      alt="罗氏-HDRUK AI制药英国赛区冠军"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌟</span>
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed break-words">
                    {safeGet('awards.page.awardsGallery.awards.roche', '罗氏-HDRUK AI制药英国赛区冠军')}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* 展望未来 */}
      <section className="py-20 bg-gradient-to-r from-paw-primary to-paw-secondary">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <AnimatedElement>
            <div className="text-center text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                🌟 {safeGet('awards.page.future.title', '展望未来')}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-4xl mx-auto px-4 leading-relaxed">
                {safeGet('awards.page.future.subtitle', '我们将继续在AI驱动的跨物种延寿药物发现领域深耕，为宠物和人类的健康长寿贡献力量')}
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  )
} 