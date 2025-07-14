import React from 'react';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function FeaturesSection() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 tech-pattern opacity-3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t.features.title}</span>
          </h2>
          <p className="text-xl text-paw-dark/80 font-medium">
            {t.features.subtitle}
          </p>
        </ScrollAnimatedElement>
        <div className="grid md:grid-cols-3 gap-8">
          {/* AI 驱动研发 */}
          <ScrollAnimatedElement animation="scale" delay={100}>
            <div className="card group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {/* AI芯片图形 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-paw-primary to-paw-deep rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <svg className="w-20 h-20 text-paw-primary" viewBox="0 0 100 100">
                      {/* 中央处理器 */}
                      <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="5"/>
                      <rect x="35" y="35" width="30" height="30" fill="white" rx="3"/>
                      <rect x="40" y="40" width="20" height="20" fill="currentColor" rx="2"/>
                      {/* 连接线 */}
                      <path d="M30 40 L10 40 M30 50 L10 50 M30 60 L10 60" stroke="currentColor" strokeWidth="2"/>
                      <path d="M70 40 L90 40 M70 50 L90 50 M70 60 L90 60" stroke="currentColor" strokeWidth="2"/>
                      <path d="M40 30 L40 10 M50 30 L50 10 M60 30 L60 10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M40 70 L40 90 M50 70 L50 90 M60 70 L60 90" stroke="currentColor" strokeWidth="2"/>
                      {/* 角落节点 */}
                      <circle cx="10" cy="40" r="3" fill="currentColor"/>
                      <circle cx="10" cy="50" r="3" fill="currentColor"/>
                      <circle cx="10" cy="60" r="3" fill="currentColor"/>
                      <circle cx="90" cy="40" r="3" fill="currentColor"/>
                      <circle cx="90" cy="50" r="3" fill="currentColor"/>
                      <circle cx="90" cy="60" r="3" fill="currentColor"/>
                      <circle cx="40" cy="10" r="3" fill="currentColor"/>
                      <circle cx="50" cy="10" r="3" fill="currentColor"/>
                      <circle cx="60" cy="10" r="3" fill="currentColor"/>
                      <circle cx="40" cy="90" r="3" fill="currentColor"/>
                      <circle cx="50" cy="90" r="3" fill="currentColor"/>
                      <circle cx="60" cy="90" r="3" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-paw-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-paw-dark">{t.features.ai.title}</h3>
              <p className="text-paw-dark/70 text-left leading-relaxed">{t.features.ai.description}</p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 跨物种转化 */}
          <ScrollAnimatedElement animation="scale" delay={200}>
            <div className="card group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {/* 跨物种转化图形 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-paw-deep to-paw-primary rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      {/* 爪子（代表宠物） */}
                      <g transform="translate(25, 20)">
                        <ellipse cx="10" cy="10" rx="4" ry="6" fill="#007C8C"/>
                        <ellipse cx="20" cy="8" rx="4" ry="6" fill="#007C8C"/>
                        <ellipse cx="30" cy="10" rx="4" ry="6" fill="#007C8C"/>
                        <ellipse cx="5" cy="20" rx="4" ry="6" fill="#007C8C"/>
                        <ellipse cx="35" cy="20" rx="4" ry="6" fill="#007C8C"/>
                        <path d="M20 18 Q10 20 8 30 Q8 38 14 40 Q20 42 20 42 Q20 42 26 40 Q32 38 32 30 Q30 20 20 18" fill="#007C8C"/>
                      </g>
                      {/* 转化箭头 */}
                      <path d="M50 50 L50 35" stroke="#00FFE0" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>
                      <path d="M50 50 L50 65" stroke="#00FFE0" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#00FFE0"/>
                        </marker>
                      </defs>
                      {/* 人形图标 */}
                      <g transform="translate(40, 65)">
                        <circle cx="10" cy="5" r="5" fill="#004C5C"/>
                        <path d="M10 10 L10 25 M10 15 L2 20 M10 15 L18 20 M10 25 L5 35 M10 25 L15 35" stroke="#004C5C" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      </g>
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-paw-primary to-paw-deep rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-paw-dark">{t.features.crossSpecies.title}</h3>
              <p className="text-paw-dark/70 text-left leading-relaxed">{t.features.crossSpecies.description}</p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-paw-deep rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-paw-deep rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-paw-deep rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </ScrollAnimatedElement>
          
          {/* 精准医疗 */}
          <ScrollAnimatedElement animation="scale" delay={300}>
            <div className="card group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {/* 精准医疗图形 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-paw-primary to-paw-deep rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      {/* DNA双螺旋 */}
                      <g transform="translate(25, 10)">
                        <path d="M10 0 Q10 10, 20 15 T20 30 Q20 40, 10 45 T10 60 Q10 70, 20 75 T20 90" 
                              stroke="#007C8C" strokeWidth="3" fill="none"/>
                        <path d="M30 0 Q30 10, 20 15 T20 30 Q20 40, 30 45 T30 60 Q30 70, 20 75 T20 90" 
                              stroke="#004C5C" strokeWidth="3" fill="none"/>
                        {/* 连接线 */}
                        <line x1="10" y1="15" x2="30" y2="15" stroke="#00FFE0" strokeWidth="2"/>
                        <line x1="10" y1="30" x2="30" y2="30" stroke="#00FFE0" strokeWidth="2"/>
                        <line x1="10" y1="45" x2="30" y2="45" stroke="#00FFE0" strokeWidth="2"/>
                        <line x1="10" y1="60" x2="30" y2="60" stroke="#00FFE0" strokeWidth="2"/>
                        <line x1="10" y1="75" x2="30" y2="75" stroke="#00FFE0" strokeWidth="2"/>
                      </g>
                      {/* 靶标符号 */}
                      <g transform="translate(55, 40)">
                        <circle cx="15" cy="15" r="15" stroke="#007C8C" strokeWidth="2" fill="none"/>
                        <circle cx="15" cy="15" r="10" stroke="#007C8C" strokeWidth="2" fill="none"/>
                        <circle cx="15" cy="15" r="5" fill="#00FFE0"/>
                        <line x1="15" y1="0" x2="15" y2="5" stroke="#007C8C" strokeWidth="2"/>
                        <line x1="15" y1="25" x2="15" y2="30" stroke="#007C8C" strokeWidth="2"/>
                        <line x1="0" y1="15" x2="5" y2="15" stroke="#007C8C" strokeWidth="2"/>
                        <line x1="25" y1="15" x2="30" y2="15" stroke="#007C8C" strokeWidth="2"/>
                      </g>
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-paw-accent rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-paw-dark">{t.features.precision.title}</h3>
              <p className="text-paw-dark/70 text-left leading-relaxed">{t.features.precision.description}</p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-paw-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </ScrollAnimatedElement>
        </div>
      </div>
    </section>
  );
} 