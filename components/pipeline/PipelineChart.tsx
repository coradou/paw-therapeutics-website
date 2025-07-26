'use client'

import React from 'react';
import { useI18n } from '../../lib/i18n';

export default function PipelineChart() {
  const { t } = useI18n();
  
  return (
    <section className="pt-6 pb-16 bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-4 md:p-8 shadow-xl">
          <div className="w-full">
            {/* Table Headers */}
            <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 mb-4 text-center text-xs md:text-sm">
              {t.pipeline.chartHeaders.map((header: string, index: number) => (
                <div key={index} className={`font-bold text-paw-deep ${index >= 4 ? 'hidden md:block' : ''}`}>{header}</div>
              ))}
            </div>
            
            {/* Canine Longevity */}
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
              <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 mb-3 items-center text-xs md:text-sm">
                <div className="font-semibold">{t.pipeline.projects.paw001.name}</div>
                <div className="text-xs md:text-sm">{t.pipeline.projects.paw001.target}</div>
                <div className="col-span-2 md:col-span-4">
                  <div className="relative h-8 md:h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-red-300 rounded-full flex items-center">
                      <div className="flex justify-between w-full px-2 md:px-4 text-white text-xs font-medium">
                        <span>2025</span>
                        <span className="hidden md:inline">2026</span>
                        <span className="hidden md:inline">2028</span>
                        <span>2029</span>
                      </div>
                    </div>
                    <div className="absolute right-0 top-1/2 transform translate-x-1 md:translate-x-2 -translate-y-1/2">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14m0 0l-7-7m7 7l-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
              
              {/* PAW-002 */}
              <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 mb-3 items-center text-xs md:text-sm">
                <div className="font-semibold">{t.pipeline.projects.paw002.name}</div>
                <div className="text-xs md:text-sm">{t.pipeline.projects.paw002.target}</div>
                <div className="col-span-2 md:col-span-4">
                  <div className="relative h-8 md:h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-300 rounded-full flex items-center">
                      <div className="flex justify-between w-full px-2 md:px-4 text-white text-xs font-medium">
                        <div className="flex items-center space-x-1">
                          <svg viewBox="0 0 100 100" className="w-3 h-3 md:w-4 md:h-4">
                            <ellipse cx="35" cy="25" rx="8" ry="12" fill="white"/>
                            <ellipse cx="50" cy="20" rx="8" ry="12" fill="white"/>
                            <ellipse cx="65" cy="25" rx="8" ry="12" fill="white"/>
                            <ellipse cx="25" cy="40" rx="8" ry="12" fill="white"/>
                            <ellipse cx="75" cy="40" rx="8" ry="12" fill="white"/>
                            <path d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" fill="white"/>
                          </svg>
                          <span>2025</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>2028</span>
                          <span className="text-xs bg-white/20 px-1 md:px-2 py-0.5 rounded hidden md:inline">{t.pipeline.projects.paw002.partner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
              
              {/* PAW-003 */}
              <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 mb-3 items-center text-xs md:text-sm">
                <div className="font-semibold">{t.pipeline.projects.paw003.name}</div>
                <div className="text-xs md:text-sm">{t.pipeline.projects.paw003.target}</div>
                <div className="col-span-2 md:col-span-4">
                  <div className="relative h-8 md:h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-300 rounded-full flex items-center">
                      <div className="flex justify-between w-full px-2 md:px-4 text-white text-xs font-medium">
                        <span>2025</span>
                        <span>2027</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </div>
            
            {/* Age-related Diseases */}
            <div>
              <div className="bg-gray-500 text-white font-bold p-3 rounded-lg mb-4">
                <span>{t.pipeline.elderlyDiseases}</span>
              </div>
              
              {/* PAW-004 */}
              <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 mb-3 items-center text-xs md:text-sm">
                <div className="font-semibold">{t.pipeline.projects.paw004.name}</div>
                <div className="text-xs md:text-sm">{t.pipeline.projects.paw004.target}</div>
                <div className="col-span-2 md:col-span-4">
                  <div className="relative h-8 md:h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-300 rounded-full flex items-center">
                      <div className="flex justify-between w-full px-2 md:px-4 text-white text-xs font-medium">
                        <span>2025</span>
                        <span>2028</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
              
              {/* PAW-005 */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2 mb-3 items-center text-xs md:text-sm">
                <div className="font-semibold">{t.pipeline.projects.paw005.name}</div>
                <div className="text-xs md:text-sm">{t.pipeline.projects.paw005.target}</div>
                <div className="col-span-2 md:col-span-5">
                  <div className="relative h-8 md:h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-gray-300 rounded-full flex items-center">
                      <div className="flex justify-between w-full px-2 md:px-4 text-white text-xs font-medium">
                        <span>2025</span>
                        <span>2027</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 