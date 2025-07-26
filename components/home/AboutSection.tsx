import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../lib/i18n';
import Image from 'next/image';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function AboutSection() {
  const { t } = useI18n();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 监听视频容器是否进入可视区域
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        
        // 当进入可视区域时自动加载并播放视频
        if (entry.isIntersecting && !isVideoLoaded) {
          setIsVideoLoaded(true);
        }
      },
      {
        threshold: 0.3, // 当30%的区域可见时触发
        rootMargin: '0px 0px -10% 0px' // 提前一点触发
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isVideoLoaded]);

  // 控制视频播放/暂停
  useEffect(() => {
    if (videoRef.current && isVideoLoaded) {
      if (isInView) {
        // 添加延迟和更好的错误处理
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // 忽略AbortError，这是正常的暂停行为
            if (error.name !== 'AbortError') {
              console.warn('Video play failed:', error);
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isVideoLoaded]);
  
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 tech-pattern opacity-3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 宗旨和愿景 */}
        <div className="text-center mb-16">
          <ScrollAnimatedElement animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-paw-primary">{t.about.title.split('，')[0]}，</span>
              <span className="text-paw-deep">{t.about.title.split('，')[1]}</span>
            </h1>
          </ScrollAnimatedElement>
          <ScrollAnimatedElement animation="fade-up" delay={100}>
            <p className="text-xl text-paw-dark/80 mb-8">{t.about.subtitle}</p>
          </ScrollAnimatedElement>
          
          {/* 公司宣传视频 */}
          <ScrollAnimatedElement animation="video" delay={200}>
            <div className="max-w-5xl mx-auto mb-16" ref={videoContainerRef}>
              <div className="bg-white rounded-3xl shadow-2xl p-4">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-black">
                  {!isVideoLoaded ? (
                    /* 视频占位符 - 滚动到此处自动加载视频 */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-paw-primary/20 to-paw-secondary/20 transition-all duration-300">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/90 rounded-full flex items-center justify-center transition-transform duration-300 shadow-lg animate-pulse">
                          <svg className="w-10 h-10 text-paw-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t.company.name}</h3>
                        <p className="text-sm text-white/90 mb-2">公司宣传视频</p>
                        <p className="text-xs text-white/70">滚动到此处自动播放</p>
                      </div>
                      
                      {/* 装饰元素 */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-1/3 left-8 w-4 h-4 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  ) : (
                    /* 本地MP4视频播放 - 滚动到此处自动加载并播放 */
                    <video 
                      ref={videoRef}
                      src="/videos/ff402f56998b4e00b7000a1bf2d25a71.mp4"
                      className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
                      controls
                      muted={true}
                      playsInline
                      preload="metadata"
                      loop
                      style={{
                        backgroundColor: '#000'
                      }}
                    >
                      <source src="/videos/ff402f56998b4e00b7000a1bf2d25a71.mp4" type="video/mp4" />
                      您的浏览器不支持视频播放。
                    </video>
                  )}
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700 font-medium mb-3">
                  {t.company.name} - 让爱活得更久 (Let Love Live Longer)
                </p>

              </div>
            </div>
          </ScrollAnimatedElement>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 左侧内容 */}
          <div className="grid grid-rows-2 gap-8">
            {/* 公司介绍板块 */}
            <ScrollAnimatedElement animation="slide-left" delay={300}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center min-h-[20rem] auto-height-container">
                <p className="text-base md:text-lg text-paw-dark/80 leading-relaxed mb-6">
                  {t.about.description}
                </p>
                <div className="border-l-4 border-paw-primary pl-6 mb-6">
                  <p className="text-base md:text-lg text-paw-dark italic">
                    &quot;{t.about.quote}&quot;
                  </p>
                </div>
                <p className="text-base md:text-lg text-paw-dark/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.missionStatement.text }}>
                </p>
              </div>
            </ScrollAnimatedElement>
            
            {/* 研发领域板块 */}
            <ScrollAnimatedElement animation="slide-left" delay={400}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center min-h-[20rem] auto-height-container">
                <h2 className="text-xl md:text-2xl font-bold text-paw-primary mb-6 md:mb-8 text-center">{t.about.researchAreas.title}</h2>
                <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                  {t.about.researchAreas.areas.map((area: string, index: number) => (
                    <ScrollAnimatedElement key={index} animation="scale" delay={500 + index * 100}>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 bg-paw-light rounded-full flex items-center justify-center group hover:bg-paw-primary transition-colors duration-300">
                          {index === 0 && (
                            <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12">
                              <ellipse cx="35" cy="25" rx="8" ry="12" fill="#007C8C" className="group-hover:fill-white"/>
                              <ellipse cx="50" cy="20" rx="8" ry="12" fill="#007C8C" className="group-hover:fill-white"/>
                              <ellipse cx="65" cy="25" rx="8" ry="12" fill="#007C8C" className="group-hover:fill-white"/>
                              <ellipse cx="25" cy="40" rx="8" ry="12" fill="#007C8C" className="group-hover:fill-white"/>
                              <ellipse cx="75" cy="40" rx="8" ry="12" fill="#007C8C" className="group-hover:fill-white"/>
                              <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="#007C8C" className="group-hover:fill-white"/>
                            </svg>
                          )}
                          {index === 1 && (
                            <svg className="w-10 h-10 md:w-12 md:h-12 fill-paw-primary group-hover:fill-white group-hover:scale-110 transition-all" viewBox="0 0 24 24">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                            </svg>
                          )}
                          {index === 2 && (
                            <svg className="w-10 h-10 md:w-12 md:h-12 fill-paw-primary group-hover:fill-white group-hover:scale-110 transition-all" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          )}
                        </div>
                        <p className="font-semibold text-paw-dark text-sm md:text-lg">{area}</p>
                      </div>
                    </ScrollAnimatedElement>
                  ))}
                </div>
              </div>
            </ScrollAnimatedElement>
          </div>
          
          {/* 右侧内容 */}
          <div className="grid grid-rows-2 gap-8">
            {/* 金毛和主人照片板块 */}
            <ScrollAnimatedElement animation="slide-right" delay={300}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center min-h-[20rem] auto-height-container relative overflow-hidden">
                <div className="flex-1 rounded-xl overflow-hidden group">
                  {/* 金毛和主人的照片 */}
                  <Image 
                    src="/images/golden-retriever-owner.jpg" 
                    alt="金毛犬和主人的温馨时刻" 
                    width={600}
                    height={400}
                    className="w-full h-full min-h-[15rem] object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* 占位符/后备内容 */}
                  <div className="absolute inset-6 md:inset-8 flex items-center justify-center bg-gradient-to-br from-paw-light to-white rounded-xl" style={{display: 'none'}}>
                    <div className="text-center p-4">
                      <p className="text-xl md:text-2xl font-bold text-paw-primary mb-2">{t.about.title.split('，')[0]}</p>
                      <p className="text-xl md:text-2xl font-bold text-paw-deep mb-4">{t.about.title.split('，')[1]}</p>
                      <p className="text-xs md:text-sm text-gray-600">
                        请上传金毛和主人的照片<br/>
                        文件名：golden-retriever-owner.jpg<br/>
                        位置：public/images/
                      </p>
                    </div>
                  </div>
                  
                  {/* 文字覆盖层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      <p className="text-xl md:text-2xl font-bold mb-1">{t.about.title.split('，')[0]}</p>
                      <p className="text-lg md:text-xl">{t.about.title.split('，')[1]}</p>
                    </div>
                  </div>
                  
                  {/* 右上角logo */}
                  <ScrollAnimatedElement animation="scale" delay={800} className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8">
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
                </div>
              </div>
            </ScrollAnimatedElement>
            
            {/* 我们的承诺板块 */}
            <ScrollAnimatedElement animation="slide-right" delay={400}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center min-h-[20rem] auto-height-container">
                <h2 className="text-xl md:text-2xl font-bold text-paw-primary mb-6 md:mb-8 text-center">{t.about.commitment.title}</h2>
                <ul className="space-y-4 md:space-y-6">
                  {t.about.commitment.items.map((item: string, index: number) => (
                    <ScrollAnimatedElement key={index} animation="fade-up" delay={500 + index * 100}>
                      <li className="flex items-start space-x-3 md:space-x-4">
                        <span className="text-paw-primary text-xl md:text-2xl flex-shrink-0">•</span>
                        <p className="text-base md:text-lg text-paw-dark/80 leading-relaxed">{item}</p>
                      </li>
                    </ScrollAnimatedElement>
                  ))}
                </ul>
              </div>
            </ScrollAnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
} 