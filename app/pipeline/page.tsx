'use client'

import React from 'react'
import Footer from '@/components/layout/Footer'
import PipelineChart from '@/components/pipeline/PipelineChart'
import { useI18n } from '../../lib/i18n'

export default function Pipeline() {
  const { t } = useI18n()

  return (
    <>
      <div className="pt-24">
        {/* Hero Section */}
        <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-gradient-to-b from-paw-light to-white">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{t.pipeline.title}</span>
              </h1>
              <p className="text-xl text-paw-dark/80">{t.pipeline.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Pipeline Chart */}
        <PipelineChart />

        {/* Research Pipeline Details */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-paw-primary mb-8 text-center">
                {t.pipeline.details.title}
              </h2>
              
              {/* Dog Longevity Projects */}
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
                      <span className="font-medium">{t.pipeline.details.timelineLabel}</span>
                      {t.pipeline.projects.paw001.timeline.map((phase: string, index: number) => (
                        <React.Fragment key={index}>
                          <span>{phase}</span>
                          {index < t.pipeline.projects.paw001.timeline.length - 1 && <span>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-paw-dark/70 mt-3">
                      {t.pipeline.projects.paw001.description}
                    </p>
                  </div>
                  
                  {/* PAW-002 */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw002.name} ({t.pipeline.projects.paw002.target})</h4>
                      <span className="px-3 py-1 bg-paw-primary/10 text-paw-primary rounded-full text-sm font-medium">{t.pipeline.projects.paw002.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                      <span className="font-medium">{t.pipeline.details.timelineLabel}</span>
                      {t.pipeline.projects.paw002.timeline.map((phase: string, index: number) => (
                        <React.Fragment key={index}>
                          <span>{phase}</span>
                          {index < t.pipeline.projects.paw002.timeline.length - 1 && <span>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-paw-dark/70 mt-3">
                      {t.pipeline.projects.paw002.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Aging Disease Projects */}
              <div>
                <h3 className="text-2xl font-bold text-paw-dark mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  {t.pipeline.details.elderlyDiseasesTitle}
                </h3>
                
                <div className="space-y-6">
                  {/* PAW-003 */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw003.name} ({t.pipeline.projects.paw003.target})</h4>
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw003.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                      <span className="font-medium">{t.pipeline.details.timelineLabel}</span>
                      {t.pipeline.projects.paw003.timeline.map((phase: string, index: number) => (
                        <React.Fragment key={index}>
                          <span>{phase}</span>
                          {index < t.pipeline.projects.paw003.timeline.length - 1 && <span>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-paw-dark/70 mt-3">
                      {t.pipeline.projects.paw003.description}
                    </p>
                  </div>
                  
                  {/* PAW-004 */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw004.name} ({t.pipeline.projects.paw004.target})</h4>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw004.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                      <span className="font-medium">{t.pipeline.details.timelineLabel}</span>
                      {t.pipeline.projects.paw004.timeline.map((phase: string, index: number) => (
                        <React.Fragment key={index}>
                          <span>{phase}</span>
                          {index < t.pipeline.projects.paw004.timeline.length - 1 && <span>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-paw-dark/70 mt-3">
                      {t.pipeline.projects.paw004.description}
                    </p>
                  </div>
                  
                  {/* PAW-005 */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-paw-dark">{t.pipeline.projects.paw005.name} ({t.pipeline.projects.paw005.target})</h4>
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">{t.pipeline.projects.paw005.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-paw-dark/70">
                      <span className="font-medium">{t.pipeline.details.timelineLabel}</span>
                      {t.pipeline.projects.paw005.timeline.map((phase: string, index: number) => (
                        <React.Fragment key={index}>
                          <span>{phase}</span>
                          {index < t.pipeline.projects.paw005.timeline.length - 1 && <span>→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-paw-dark/70 mt-3">
                      {t.pipeline.projects.paw005.description}
                    </p>
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