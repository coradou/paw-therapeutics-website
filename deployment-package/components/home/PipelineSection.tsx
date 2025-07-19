import React from 'react';
import { useI18n } from '../../lib/i18n';
import ScrollAnimatedElement from '../ui/ScrollAnimatedElement';

export default function PipelineSection() {
  const { t } = useI18n();
  
  return (
    <section id="pipeline" className="pt-8 pb-16 md:pt-10 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedElement animation="fade-up" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.pipeline.title}</span>
          </h1>
          <p className="text-xl text-paw-dark/80">{t.pipeline.subtitle}</p>
        </ScrollAnimatedElement>
        
        {/* 管线图表 */}
        <ScrollAnimatedElement animation="scale" delay={100}>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl overflow-x-auto">
            <div className="min-w-[800px]">
              {/* 表头 */}
              <div className="grid grid-cols-8 gap-2 mb-4 text-center">
                {t.pipeline.chartHeaders.map((header: string, index: number) => (
                  <div key={index} className="font-bold text-paw-deep">{header}</div>
                ))}
                <div></div>
              </div>
              
              {/* 犬类延寿 */}
              <div className="mb-8">
                <div className="bg-paw-primary text-white font-bold p-3 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <svg viewBox="0 0 100 100" className="w-6 h-6">
                      <ellipse cx="35" cy="25" rx="8" ry="12" fill="white"/>
                      <ellipse cx="50" cy="20" rx="8" ry="12" fill="white"/>
                      <ellipse cx="65" cy="25" rx="8" ry="12" fill="white"/>
                      <ellipse cx="25" cy="40" rx="8" ry="12" fill="white"/>
                      <ellipse cx="75" cy="40" rx="8" ry="12" fill="white"/>
                      <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="white"/>
                    </svg>
                    <span>{t.pipeline.dogLongevity}</span>
                  </div>
                </div>
                
                {/* PAW-001 */}
                <div className="grid grid-cols-8 gap-2 mb-3 items-center">
                  <div className="font-semibold">{t.pipeline.projects.paw001.name}</div>
                  <div className="text-sm">{t.pipeline.projects.paw001.target}</div>
                  <div className="col-span-5">
                    <div className="relative h-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-300 rounded-full flex items-center">
                        <div className="flex justify-between w-full px-4 text-white text-xs font-medium">
                          {t.pipeline.projects.paw001.timeline.map((time: string, index: number) => (
                            <span key={index}>{time}</span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 12h14m0 0l-7-7m7 7l-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                
                {/* PAW-002 */}
                <div className="grid grid-cols-8 gap-2 mb-3 items-center">
                  <div className="font-semibold">{t.pipeline.projects.paw002.name}</div>
                  <div className="text-sm">{t.pipeline.projects.paw002.target}</div>
                  <div className="col-span-5">
                    <div className="relative h-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-300 rounded-full flex items-center">
                        <div className="flex justify-between w-full px-4 text-white text-xs font-medium">
                          <div className="flex items-center space-x-1">
                            <svg viewBox="0 0 100 100" className="w-4 h-4">
                              <ellipse cx="35" cy="25" rx="8" ry="12" fill="white"/>
                              <ellipse cx="50" cy="20" rx="8" ry="12" fill="white"/>
                              <ellipse cx="65" cy="25" rx="8" ry="12" fill="white"/>
                              <ellipse cx="25" cy="40" rx="8" ry="12" fill="white"/>
                              <ellipse cx="75" cy="40" rx="8" ry="12" fill="white"/>
                              <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="white"/>
                            </svg>
                            <span>{t.pipeline.projects.paw002.timeline[0]}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>{t.pipeline.projects.paw002.timeline[1]}</span>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{t.pipeline.projects.paw002.partner}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                
                {/* PAW-003 */}
                <div className="grid grid-cols-8 gap-2 mb-3 items-center">
                  <div className="font-semibold">{t.pipeline.projects.paw003.name}</div>
                  <div className="text-sm">{t.pipeline.projects.paw003.target}</div>
                  <div className="col-span-5">
                    <div className="relative h-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-300 rounded-full flex items-center">
                        <div className="flex justify-between w-full px-4 text-white text-xs font-medium">
                          <span>{t.pipeline.projects.paw003.timeline[0]}</span>
                          <span>{t.pipeline.projects.paw003.timeline[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              
              {/* 老年疾病 */}
              <div>
                <div className="bg-gray-500 text-white font-bold p-3 rounded-lg mb-4">
                  <span>{t.pipeline.elderlyDiseases}</span>
                </div>
                
                {/* PAW-004 */}
                <div className="grid grid-cols-8 gap-2 mb-3 items-center">
                  <div className="font-semibold">{t.pipeline.projects.paw004.name}</div>
                  <div className="text-sm">{t.pipeline.projects.paw004.target}</div>
                  <div className="col-span-5">
                    <div className="relative h-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-300 rounded-full flex items-center">
                        <div className="flex justify-between w-full px-4 text-white text-xs font-medium">
                          <span>{t.pipeline.projects.paw004.timeline[0]}</span>
                          <span>{t.pipeline.projects.paw004.timeline[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                
                {/* PAW-005 */}
                <div className="grid grid-cols-8 gap-2 mb-3 items-center">
                  <div className="font-semibold">{t.pipeline.projects.paw005.name}</div>
                  <div className="text-sm">{t.pipeline.projects.paw005.target}</div>
                  <div className="col-span-5">
                    <div className="relative h-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-gray-300 rounded-full flex items-center">
                        <div className="flex justify-between w-full px-4 text-white text-xs font-medium">
                          <span>{t.pipeline.projects.paw005.timeline[0]}</span>
                          <span>{t.pipeline.projects.paw005.timeline[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedElement>
        
        {/* 研发药物管线详情 */}
        <ScrollAnimatedElement animation="fade-up" delay={200} className="mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-paw-primary mb-8 text-center">
              {t.pipeline.details.title}
            </h2>
            
            {/* 犬类延寿项目 */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-paw-dark mb-6 flex items-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8 mr-3">
                  <ellipse cx="35" cy="25" rx="8" ry="12" fill="#007C8C"/>
                  <ellipse cx="50" cy="20" rx="8" ry="12" fill="#007C8C"/>
                  <ellipse cx="65" cy="25" rx="8" ry="12" fill="#007C8C"/>
                  <ellipse cx="25" cy="40" rx="8" ry="12" fill="#007C8C"/>
                  <ellipse cx="75" cy="40" rx="8" ry="12" fill="#007C8C"/>
                  <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="#007C8C"/>
                </svg>
                {t.pipeline.details.dogLongevityTitle}
              </h3>
              
              <div className="space-y-6">
                {/* PAW-001 */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw001.name} ({t.pipeline.projects.paw001.target})</h4>
                    <span className="px-3 py-1 bg-paw-primary/10 text-paw-primary rounded-full text-sm font-medium">{t.pipeline.projects.paw001.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                    <span className="font-medium">{t.timeline.label}</span>
                    {t.pipeline.projects.paw001.timeline.map((time: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{time}</span>
                        {index < t.pipeline.projects.paw001.timeline.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* PAW-002 */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw002.name} ({t.pipeline.projects.paw002.target})</h4>
                    <span className="px-3 py-1 bg-paw-primary/10 text-paw-primary rounded-full text-sm font-medium">{t.pipeline.projects.paw002.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                    <span className="font-medium">{t.timeline.label}</span>
                    {t.pipeline.projects.paw002.timeline.map((time: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{time}</span>
                        {index < t.pipeline.projects.paw002.timeline.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* PAW-003 */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw003.name} ({t.pipeline.projects.paw003.target})</h4>
                    <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw003.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                    <span className="font-medium">{t.timeline.label}</span>
                    {t.pipeline.projects.paw003.timeline.map((time: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{time}</span>
                        {index < t.pipeline.projects.paw003.timeline.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 老年疾病项目 */}
            <div>
              <h3 className="text-2xl font-bold text-paw-dark mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                {t.pipeline.details.elderlyDiseasesTitle}
              </h3>
              
              <div className="space-y-6">
                {/* PAW-004 */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw004.name} ({t.pipeline.projects.paw004.target})</h4>
                    <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw004.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-paw-dark/70 mb-3">
                    <span className="font-medium">{t.timeline.label}</span>
                    {t.pipeline.projects.paw004.timeline.map((time: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{time}</span>
                        {index < t.pipeline.projects.paw004.timeline.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm text-paw-dark/70">{t.pipeline.projects.paw004.description}</p>
                </div>
                
                {/* PAW-005 */}
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw005.name} ({t.pipeline.projects.paw005.target})</h4>
                    <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw005.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-paw-dark/70 mb-3">
                    <span className="font-medium">{t.timeline.label}</span>
                    {t.pipeline.projects.paw005.timeline.map((time: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{time}</span>
                        {index < t.pipeline.projects.paw005.timeline.length - 1 && <span>→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-sm text-paw-dark/70">{t.pipeline.projects.paw005.description}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedElement>
        
        {/* Academic Support */}
        <ScrollAnimatedElement animation="fade-up" delay={300} className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-paw-dark mb-6">{t.academic.support}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://doi.org/10.1038/s41467-021-25557-2" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow hover:scale-105">
              <div className="text-paw-primary font-bold mb-2">Nature Communications</div>
              <p className="text-sm text-gray-600">IL-6 and TGFβ1 identified as regulators of hematopoietic ageing</p>
            </a>
            <a href="https://doi.org/10.1038/s41586-021-03755-1" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow hover:scale-105">
              <div className="text-paw-primary font-bold mb-2">Nature</div>
              <p className="text-sm text-gray-600">Inhibition of IL-11 signalling extends mammalian healthspan and lifespan</p>
            </a>
            <a href="https://doi.org/10.1111/age.12707" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow hover:scale-105">
              <div className="text-paw-primary font-bold mb-2">Oxford Research</div>
              <p className="text-sm text-gray-600">Connecting serum IGF-1, body size, and age in the domestic dog</p>
            </a>
          </div>
        </ScrollAnimatedElement>
      </div>
    </section>
  );
} 